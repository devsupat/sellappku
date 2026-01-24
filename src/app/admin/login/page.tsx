'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setError('');
 setLoading(true);

 try {
 const res = await fetch('/api/admin/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ password }),
 });

 const data = await res.json();

 if (res.ok) {
 router.push('/admin');
 router.refresh();
 } else {
 setError(data.error || 'Invalid password');
 }
 } catch (err) {
 setError('Something went wrong');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
 <div className="w-full max-w-md">
 <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 ">
 {/* Header */}
 <div className="text-center mb-8">
 <div className="inline-flex p-4 bg-indigo-100 rounded-2xl mb-4">
 <Lock className="h-8 w-8 text-indigo-600" />
 </div>
 <h1 className="text-2xl font-bold text-gray-900 mb-2">
 Admin Access
 </h1>
 <p className="text-gray-600 ">
 Enter password to continue
 </p>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
 Password
 </label>
 <input
 id="password"
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus focus focus transition-colors"
 placeholder="Enter admin password"
 required
 autoFocus
 />
 </div>

 {error && (
 <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
 <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
 <p className="text-sm text-red-600 ">{error}</p>
 </div>
 )}

 <button
 type="submit"
 disabled={loading}
 className="w-full px-6 py-3 bg-indigo-600 hover disabled text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
 >
 {loading ? (
 <>
 <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
 Verifying...
 </>
 ) : (
 <>
 <Lock className="h-5 w-5" />
 Login
 </>
 )}
 </button>
 </form>
 </div>
 </div>
 </div>
 );
}
