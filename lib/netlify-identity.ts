import {
  AuthError,
  MissingIdentityError,
  getSettings as netlifyGetSettings,
  signup as netlifySignup,
  login as netlifyLogin,
  logout as netlifyLogout,
  getUser as netlifyGetUser,
  oauthLogin as netlifyOauthLogin,
  handleAuthCallback as netlifyHandleAuthCallback,
  onAuthChange
} from '@netlify/identity';

function identityErrorMessage(error: unknown): string | null {
  if (error instanceof MissingIdentityError) {
    return 'CampusLoop accounts are not enabled on this site yet. The site owner needs to enable Netlify Identity in the Netlify project settings.';
  }
  if (error instanceof AuthError && (!((error.status ?? (error as any).cause?.status)) || (error.status ?? (error as any).cause?.status) >= 500)) {
    return 'The account service could not be reached. Please try again later or contact the site owner.';
  }
  return null;
}

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
  const provider = netlifyUser.app_metadata?.provider;
  return {
    id: netlifyUser.id,
    userId: netlifyUser.id,
    email: netlifyUser.email || '',
    name: metadata.full_name || netlifyUser.email?.split('@')[0] || 'Student',
    role: metadata.role || 'STUDENT',
    accountType: metadata.account_type || (provider === 'google' ? 'google' : 'college_email'),
    college: metadata.college || '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(metadata.full_name || netlifyUser.email || 'student')
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
    const setupMessage = identityErrorMessage(err);
    if (setupMessage) throw new Error(setupMessage);
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
    const setupMessage = identityErrorMessage(err);
    if (setupMessage) throw new Error(setupMessage);
    if (err.message && err.message.includes('configured college domain')) throw err;
    if (err instanceof AuthError && typeof (err.status ?? (err as any).cause?.status) === 'number' && (err.status ?? (err as any).cause?.status) >= 400 && (err.status ?? (err as any).cause?.status) < 500) {
      throw new Error('Incorrect email or password. If you just registered, confirm your address from the email we sent first.');
    }
    if (err instanceof AuthError) {
      throw new Error('The account service could not be reached. Please try again later or contact the site owner.');
    }
    throw new Error('Incorrect email or password.');
  }
}

export async function loginWithGoogle(): Promise<void> {
  try {
    const settings = await netlifyGetSettings();
    if (!settings.providers.google) {
      throw new Error('Google sign-in is not configured for this site yet. The site owner must add Google OAuth credentials in Netlify Identity settings.');
    }
    netlifyOauthLogin('google');
  } catch (err: any) {
    const setupMessage = identityErrorMessage(err);
    if (setupMessage) throw new Error(setupMessage);
    if (err.message?.includes('not configured for this site')) throw err;
    if (err.message && !err.message.includes('Redirecting')) {
      throw new Error('Google sign-in could not be completed. Please try again.');
    }
  }
}

export async function handleOAuthCallback(): Promise<UserProfile | null> {
  try {
    const callback = await netlifyHandleAuthCallback();
    if (!callback?.user) return null;

    const user = normalizeUser(callback.user);

    const configuredDomains = getCollegeEmailDomains();
    const isEduInAddress = user?.email?.trim().toLowerCase().endsWith('.edu.in') ?? false;
    const isConfiguredCollegeAddress = configuredDomains.length === 0 || (user?.email ? validateCollegeEmail(user.email) : false);
    if (user?.email && !isEduInAddress && !isConfiguredCollegeAddress) {
      await netlifyLogout();
      throw new Error('Google sign-in is limited to authorized college addresses, including .edu.in domains.');
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
