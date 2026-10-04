import { Suspense } from 'react';
import { AuthPageComponent } from '@/components/auth/auth-page';

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1322] flex items-center justify-center text-white">Loading...</div>}>
      <AuthPageComponent />
    </Suspense>
  );
}
