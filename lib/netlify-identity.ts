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
  accountType: 'college_email' | 'google';
  college: string;
  avatar: string;
}

export function getCollegeEmailDomains(): string[] {
  const envVal = process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAINS || '';
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
    college: metadata.college || '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(metadata.full_name || netlifyUser.email || 'student')}`
  };
}

export async function signUpWithCollegeEmail({
  name,
  email,
  college,
  password,
}: {
  name: string;
  email: string;
  college: string;
  password: string;
}): Promise<UserProfile | null> {
  if (!name || !name.trim()) throw new Error('Please enter your full name.');
  if (!email || !validateCollegeEmail(email)) {
    throw new Error('Use an email address from the configured college domain.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  try {
    await netlifySignup(email.trim().toLowerCase(), password, {
      full_name: name.trim(),
      account_type: 'college_email',
      college: college || 'A P Shah Institute of Technology (APSIT, Thane)',
      role: 'STUDENT'
    });
    const authenticatedUser = await netlifyGetUser();
    if (!authenticatedUser) {
      throw new Error('Your account was created. Check your college inbox for a confirmation link, then sign in.');
    }
    return normalizeUser(authenticatedUser);
  } catch (err: any) {
    const msg = err.message || '';
    if (msg.includes('already exists') || msg.includes('registered')) {
      throw new Error('An account already exists with these details. Try signing in.');
    }
    throw new Error(msg || 'Registration failed. Please try again.');
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
      throw new Error('Use an email address from the configured college domain.');
    }

    return user;
  } catch (err: any) {
    if (err.message && err.message.includes('official college email')) {
      throw err;
    }
    throw new Error('Incorrect email or password.');
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
