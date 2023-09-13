'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import signIn from '../../firebase/utils/signin';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await signIn(email, password);

    if (error) {
      return alert(error.message)
    }

    return router.push("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300"
          >
            Log in
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            {`Don't have an account yet?`}{' '}
            <Link href="/register" className="text-indigo-500 hover:text-indigo-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
