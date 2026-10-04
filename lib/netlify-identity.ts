import {
  signup as netlifySignup,
  login as netlifyLogin,
  logout as netlifyLogout,
  getUser as netlifyGetUser,
  oauthLogin as netlifyOauthLogin,
  handleAuthCallback as netlifyHandleAuthCallback,
  onAuthChange
} from '@netlify/identity';

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  accountType: 'college_email' | 'apaar' | 'google';
  college: string;
  referralCode?: string;
  apaarLast4?: string | null;
  apaarVerification?: string | null;
  avatar: string;
}

export function getCollegeEmailDomains(): string[] {
  const envVal =
    process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAINS ||
    process.env.VITE_COLLEGE_EMAIL_DOMAINS ||
    '';
  if (!envVal || !envVal.trim()) return [];
  return envVal
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

export function validateCollegeEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const lower = email.trim().toLowerCase();
  if (!lower.includes('@')) return false;

  const domain = lower.split('@').pop() || '';
  const configuredDomains = getCollegeEmailDomains();

  if (configuredDomains.length > 0) {
    return configuredDomains.some((cfg) => domain === cfg || domain.endsWith('.' + cfg));
  }

  // Educational fallback domains (.edu, .ac.in, .edu.in, etc.)
  return (
    domain.endsWith('.edu') ||
    domain.endsWith('.ac.in') ||
    domain.endsWith('.edu.in') ||
    /\.edu\.[a-z]{2,3}$/.test(domain) ||
    /\.ac\.[a-z]{2,3}$/.test(domain)
  );
}

export function validateApaarId(apaarId: string): boolean {
  if (!apaarId) return false;
  const cleaned = String(apaarId).trim();
  return /^\d{12}$/.test(cleaned);
}

export function getApaarInternalEmail(apaarId: string): string {
  const cleaned = String(apaarId).trim();
  return `apaar_${cleaned}@campusloop.internal`;
}

export function normalizeUser(netlifyUser: any): UserProfile | null {
  if (!netlifyUser) return null;
  const metadata = netlifyUser.user_metadata || {};
  return {
    id: netlifyUser.id,
    userId: netlifyUser.id,
    email: netlifyUser.email || '',
    name: metadata.full_name || netlifyUser.email?.split('@')[0] || 'Student',
    role: metadata.role || 'STUDENT',
    accountType: metadata.account_type || 'college_email',
    college: metadata.college || 'A P Shah Institute of Technology (APSIT, Thane)',
    referralCode: metadata.referral_code || '',
    apaarLast4: metadata.apaar_last4 || null,
    apaarVerification: metadata.apaar_verification || null,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(metadata.full_name || netlifyUser.email || 'student')}`
  };
}

export async function signUpWithCollegeEmail({
  name,
  email,
  college,
  password,
  referralCode
}: {
  name: string;
  email: string;
  college: string;
  password: string;
  referralCode?: string;
}): Promise<UserProfile | null> {
  if (!name || !name.trim()) throw new Error('Please enter your full name.');
  if (!email || !validateCollegeEmail(email)) {
    throw new Error('Please use your official college email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  try {
    const rawUser = await netlifySignup(email.trim().toLowerCase(), password, {
      full_name: name.trim(),
      account_type: 'college_email',
      college: college || 'A P Shah Institute of Technology (APSIT, Thane)',
      referral_code: referralCode ? referralCode.trim() : '',
      role: 'STUDENT'
    });
    return normalizeUser(rawUser);
  } catch (err: any) {
    const msg = err.message || '';
    if (msg.includes('already exists') || msg.includes('registered')) {
      throw new Error('An account already exists with these details. Try signing in.');
    }
    throw new Error(msg || 'Registration failed. Please try again.');
  }
}

export async function signUpWithApaar({
  name,
  apaarId,
  college,
  password,
  referralCode
}: {
  name: string;
  apaarId: string;
  college: string;
  password: string;
  referralCode?: string;
}): Promise<UserProfile | null> {
  if (!name || !name.trim()) throw new Error('Please enter your full name.');
  if (!validateApaarId(apaarId)) {
    throw new Error('APAAR ID must contain exactly 12 digits.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const cleanedApaar = String(apaarId).trim();

  // 1. Call Netlify Function
  try {
    const response = await fetch('/.netlify/functions/apaar-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: name.trim(),
        apaar_id: cleanedApaar,
        college: college || 'A P Shah Institute of Technology (APSIT, Thane)',
        password,
        referral_code: referralCode ? referralCode.trim() : ''
      })
    });

    if (response.ok) {
      const data = await response.json();
      const internalEmail = getApaarInternalEmail(cleanedApaar);
      const loggedIn = await netlifyLogin(internalEmail, password);
      return normalizeUser(loggedIn || data.user);
    } else {
      const errData = await response.json().catch(() => ({}));
      if (errData.message) throw new Error(errData.message);
    }
  } catch (err: any) {
    if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('404')) {
      throw err;
    }
  }

  // 2. Local Fallback for development without Netlify CLI
  const internalEmail = getApaarInternalEmail(cleanedApaar);
  try {
    const rawUser = await netlifySignup(internalEmail, password, {
      full_name: name.trim(),
      account_type: 'apaar',
      college: college || 'A P Shah Institute of Technology (APSIT, Thane)',
      referral_code: referralCode ? referralCode.trim() : '',
      apaar_last4: cleanedApaar.slice(-4),
      apaar_verification: 'format_only',
      role: 'STUDENT'
    });

    try {
      const loggedIn = await netlifyLogin(internalEmail, password);
      return normalizeUser(loggedIn || rawUser);
    } catch {
      return normalizeUser(rawUser);
    }
  } catch (err: any) {
    const msg = err.message || '';
    if (msg.includes('already exists') || msg.includes('registered')) {
      throw new Error('An account already exists with this APAAR ID. Try signing in.');
    }
    throw new Error(msg || 'APAAR account creation failed. Please try again.');
  }
}

export async function loginWithCollegeEmail(email: string, password: string): Promise<UserProfile | null> {
  if (!email || !email.trim()) throw new Error('Please enter your student email address.');
  if (!password) throw new Error('Please enter your password.');

  try {
    const rawUser = await netlifyLogin(email.trim().toLowerCase(), password);
    const user = normalizeUser(rawUser);

    const configuredDomains = getCollegeEmailDomains();
    if (configuredDomains.length > 0 && user?.email && !validateCollegeEmail(user.email)) {
      await netlifyLogout();
      throw new Error('Please use your official college email address.');
    }

    return user;
  } catch (err: any) {
    if (err.message && err.message.includes('official college email')) {
      throw err;
    }
    throw new Error('Incorrect email/APAAR ID or password.');
  }
}

export async function loginWithApaar(apaarId: string, password: string): Promise<UserProfile | null> {
  if (!validateApaarId(apaarId)) {
    throw new Error('APAAR ID must contain exactly 12 digits.');
  }
  if (!password) throw new Error('Please enter your password.');

  const internalEmail = getApaarInternalEmail(apaarId);
  try {
    const rawUser = await netlifyLogin(internalEmail, password);
    return normalizeUser(rawUser);
  } catch {
    throw new Error('Incorrect email/APAAR ID or password.');
  }
}

export function loginWithGoogle(): void {
  try {
    netlifyOauthLogin('google');
  } catch (err: any) {
    if (err.message && !err.message.includes('Redirecting')) {
      throw new Error('Google sign-in could not be completed. Please try again.');
    }
  }
}

export async function handleOAuthCallback(): Promise<UserProfile | null> {
  try {
    const rawUser = await netlifyHandleAuthCallback();
    if (!rawUser) return null;

    const user = normalizeUser(rawUser);

    const configuredDomains = getCollegeEmailDomains();
    if (configuredDomains.length > 0 && user?.email && !validateCollegeEmail(user.email)) {
      await netlifyLogout();
      throw new Error('Google account must belong to an authorized college domain.');
    }

    return user;
  } catch (err: any) {
    if (err.message && err.message.includes('college domain')) {
      throw err;
    }
    return null;
  }
}

export async function getCurrentNetlifyUser(): Promise<UserProfile | null> {
  try {
    const rawUser = await netlifyGetUser();
    return normalizeUser(rawUser);
  } catch {
    return null;
  }
}

export async function logoutNetlifyUser(): Promise<void> {
  try {
    await netlifyLogout();
  } catch {
    // Silent catch
  }
}

export { onAuthChange };
