"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Key,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Repeat
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { CollegeSelect } from '@/components/college-select';

interface AuthPageProps {
  initialMode?: 'signup' | 'login';
}

export function AuthPageComponent({ initialMode = 'signup' }: AuthPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlMode = searchParams ? searchParams.get('mode') : null;
  const [mode, setMode] = useState<'signup' | 'login'>(urlMode === 'login' || urlMode === 'signup' ? urlMode : initialMode);
  const [authMethod, setAuthMethod] = useState<'college_email' | 'apaar'>('college_email');

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [apaarId, setApaarId] = useState('');
  const [college, setCollege] = useState('A P Shah Institute of Technology (APSIT, Thane)');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    loginWithCollege,
    loginWithApaar,
    signUpWithCollege,
    signUpWithApaar,
    loginWithGoogle
  } = useAuth();

  const handleModeSwitch = (newMode: 'signup' | 'login') => {
    setError('');
    setSuccessMsg('');
    setMode(newMode);
  };

  const handleAuthMethodSwitch = (method: 'college_email' | 'apaar') => {
    setError('');
    setSuccessMsg('');
    setAuthMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (authMethod === 'college_email') {
          await signUpWithCollege({
            name: fullName,
            email,
            college,
            password,
            referralCode
          });
        } else {
          await signUpWithApaar({
            name: fullName,
            apaarId,
            college,
            password,
            referralCode
          });
        }
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.push('/marketplace');
        }, 1200);
      } else {
        if (authMethod === 'college_email') {
          await loginWithCollege(email, password);
        } else {
          await loginWithApaar(apaarId, password);
        }
        router.push('/marketplace');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setError('');
    try {
      loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in could not be completed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1322] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden text-slate-100">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-lg bg-[#182032] border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        {/* CampusLoop Logo Header */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <Repeat className="h-5 w-5" />
            </span>
            <span className="font-bold text-xl tracking-tight text-white">
              Campus<span className="text-purple-400">Loop</span>
            </span>
          </Link>
        </div>

        {/* Purple Sparkle Icon */}
        <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Sparkles size={24} className="stroke-[2]" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-tight mb-2">
          {mode === 'signup' ? 'Create Your Student Account' : 'Welcome Back'}
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-400 text-center max-w-sm mx-auto mb-6 leading-relaxed">
          {mode === 'signup'
            ? 'Sign up with your educational email to unlock verified college trade.'
            : 'Sign in with your college email or APAAR ID to access your dashboard.'}
        </p>

        {/* Auth Method Toggle: [ College Email ] [ APAAR ID ] */}
        <div className="grid grid-cols-2 p-1 bg-[#111726] border border-slate-800/80 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleAuthMethodSwitch('college_email')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMethod === 'college_email'
                ? 'bg-[#1e2638] text-white shadow-sm border border-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={16} />
            College Email
          </button>
          <button
            type="button"
            onClick={() => handleAuthMethodSwitch('apaar')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMethod === 'apaar'
                ? 'bg-[#1e2638] text-white shadow-sm border border-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard size={16} />
            APAAR ID
          </button>
        </div>

        {/* Error / Success Notifications */}
        {error && (
          <div className="bg-red-950/50 border border-red-500/30 text-red-300 p-3.5 rounded-xl text-xs sm:text-sm mb-6 flex items-start gap-2.5">
            <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 p-3.5 rounded-xl text-xs sm:text-sm mb-6 flex items-start gap-2.5">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-400 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          )}

          {authMethod === 'college_email' ? (
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                Student Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="aarav.sharma@iitb.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-slate-500 mt-1.5 font-normal">
                  Must be a verified educational email (e.g. .edu, .ac.in, .edu.in)
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                APAAR ID
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <CreditCard size={18} />
                </div>
                <input
                  type="text"
                  required
                  maxLength={12}
                  placeholder="123456789012"
                  value={apaarId}
                  onChange={(e) => setApaarId(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className="w-full h-12 pl-11 pr-4 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-normal">
                APAAR ID format is checked here. Official APAAR verification requires an approved verification process.
              </p>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                Select College
              </label>
              <CollegeSelect
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-12 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                Referral Code (Optional)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <Key size={18} />
                </div>
                <input
                  type="text"
                  placeholder="ALEX50"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#111726] border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-normal">
                Get an extra 50 starting credits by entering an ambassador code.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-600/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              mode === 'signup' ? 'Create Student Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative bg-[#182032] px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            OR
          </span>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleClick}
          className="w-full h-12 bg-[#111726] hover:bg-[#161f33] border border-slate-800 text-white rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.99]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Bottom Switch Link */}
        <p className="mt-8 text-center text-sm text-slate-400 font-normal">
          {mode === 'signup' ? (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => handleModeSwitch('signup')}
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
              >
                Create Student Account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
