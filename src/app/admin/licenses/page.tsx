"use client";

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LicenseDashboard from './_components/LicenseDashboard';
import { Eye, EyeOff, Key } from 'lucide-react';
import { toast } from 'sonner';

export default function LicenseAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in");
    } catch (err: any) {
      setLoginError(err.code === 'auth/invalid-credential' ? 'Invalid email or password.' : err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-[#09090b] relative overflow-hidden pt-12">
        <div className="w-full max-w-[384px] flex flex-col items-start h-[calc(100vh-3rem)] px-4 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 w-full pb-4 border-b border-white/10">
            <div className="w-8 h-8 bg-[#5b4fff] rounded-lg flex items-center justify-center text-base">
              🔑
            </div>
            <div className="font-syne text-[18px] font-bold text-white tracking-tight">
              Nex<span className="text-[#8b7fff]">Centauri</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-7 py-8 w-full">
            <form className="w-full" onSubmit={handleLogin}>
              <div className="w-full mb-4">
                <label className="block text-[14px] font-medium text-white/90 mb-2 normal-case tracking-normal">
                  Email
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  autoComplete="email" 
                  required 
                  className="w-full h-10 bg-transparent border border-white/15 rounded-md text-white font-sans text-[14px] px-3 outline-none transition-colors duration-200 focus:border-white placeholder:text-white/40"
                />
              </div>
              
              <div className="w-full mb-4">
                <label className="block text-[14px] font-medium text-white/90 mb-2 normal-case tracking-normal">
                  Password
                </label>
                <div className="relative w-full">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    autoComplete="current-password" 
                    required 
                    className="w-full h-10 bg-transparent border border-white/15 rounded-md text-white font-sans text-[14px] px-3 pr-10 outline-none transition-colors duration-200 focus:border-white placeholder:text-white/40"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1 right-1 w-8 h-8 bg-transparent border-none text-white/50 cursor-pointer rounded flex items-center justify-center transition-all duration-200 hover:bg-white/10 hover:text-white/90"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-[#c0392b]/15 border border-[#c0392b]/30 text-[#ee8888] text-[13px] py-2.5 px-3.5 rounded-md w-full mb-4">
                  {loginError}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full h-10 bg-white text-[#09090b] border-none rounded-md font-sans text-[14px] font-medium cursor-pointer flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <span>Sign in with email</span>
                )}
              </button>
            </form>
          </div>

          <div className="mt-4 text-[14px] text-white/50">
            <p>By signing in, you agree to our <a href="#" className="text-white no-underline hover:underline">Terms of Service</a> and <a href="#" className="text-white no-underline hover:underline">Privacy Policy</a></p>
          </div>
          
          <div className="mt-auto border-t border-white/10 py-6 w-full text-[14px] text-white/50">
            <p>Don't have an account? <a href="#" className="text-white no-underline hover:underline">Sign up</a></p>
          </div>
        </div>
      </div>
    );
  }

  return <LicenseDashboard user={user} onLogout={handleLogout} />;
}
