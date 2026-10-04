import { admin } from '@netlify/identity';

interface RequestBody {
  full_name?: string;
  apaar_id?: string;
  college?: string;
  password?: string;
  referral_code?: string;
}

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60000 });
    return false;
  }
  if (entry.count >= 10) {
    return true;
  }
  entry.count += 1;
  return false;
}

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Method Not Allowed. Only POST is supported.' }),
      { status: 455, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const clientIp = req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ message: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body: RequestBody = await req.json();
    const { full_name, apaar_id, college, password, referral_code } = body;

    if (!full_name || !full_name.trim()) {
      return new Response(
        JSON.stringify({ message: 'Full name is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!apaar_id || !/^\d{12}$/.test(apaar_id.trim())) {
      return new Response(
        JSON.stringify({ message: 'APAAR ID must contain exactly 12 digits.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!password || password.length < 6) {
      return new Response(
        JSON.stringify({ message: 'Password must be at least 6 characters long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanedApaar = apaar_id.trim();
    const apaarLast4 = cleanedApaar.slice(-4);
    const internalEmail = `apaar_${cleanedApaar}@campusloop.internal`;

    const user = await admin.createUser({
      email: internalEmail,
      password: password,
      data: {
        user_metadata: {
          account_type: 'apaar',
          full_name: full_name.trim(),
          college: college || 'A P Shah Institute of Technology (APSIT, Thane)',
          referral_code: referral_code ? referral_code.trim() : '',
          apaar_last4: apaarLast4,
          apaar_verification: 'format_only',
          role: 'STUDENT'
        }
      }
    });

    return new Response(
      JSON.stringify({
        message: 'APAAR student account created successfully.',
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata
        }
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    const errorMsg = error.message || 'Failed to create APAAR account.';
    if (errorMsg.includes('already exists') || errorMsg.includes('registered')) {
      return new Response(
        JSON.stringify({ message: 'An account with this APAAR ID already exists. Try signing in.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: errorMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
