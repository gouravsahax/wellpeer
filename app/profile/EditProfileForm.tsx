'use client';

import React, { useState, useTransition } from 'react';
import { updateProfileName } from '@/lib/user-action';
import { SignOut } from '@/lib/auth-action';
import { User, Mail, Award, LogOut, Edit3, Check, X, Loader2 } from 'lucide-react';

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  reccCount: number;
  image: string | null;
}

interface EditProfileFormProps {
  user: UserData | null;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center text-zinc-400">
        No profile data found. Please sign in again.
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('name', trimmedName);
        await updateProfileName(formData);
        setIsEditing(false);
      } catch (err: any) {
        setError(err.message || 'Failed to update name');
      }
    });
  };

  const getInitials = (fullName: string | null) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full max-w-md bg-black backdrop-blur-lg border border-zinc-800 rounded-sm p-8 shadow-2xl transition-all duration-300 hover:border-zinc-700/80">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 flex items-center justify-center text-white text-3xl font-semibold shadow-inner border-2 border-zinc-700 select-none">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name ?? 'User Avatar'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="w-full flex flex-col items-center gap-2">
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 text-white rounded-lg px-3 py-2 text-center text-lg outline-none transition"
                placeholder="Enter new name"
                maxLength={40}
                disabled={isPending}
                autoFocus
              />
              <button
                type="submit"
                disabled={isPending}
                className="p-2.5 bg-white text-black hover:bg-zinc-200 rounded-lg cursor-pointer transition flex items-center justify-center disabled:opacity-50"
                title="Save name"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : <Check className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setName(user.name ?? '');
                  setError(null);
                  setIsEditing(false);
                }}
                disabled={isPending}
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg cursor-pointer transition flex items-center justify-center disabled:opacity-50"
                title="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1 self-start font-medium">{error}</p>}
          </form>
        ) : (
          <div className="flex items-center gap-2 group">
            <h2 className="text-2xl font-bold text-white tracking-tight">{user.name ?? 'Anonymous'}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/60 cursor-pointer transition"
              title="Edit Name"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <hr className="border-zinc-800 my-6" />

      <div className="space-y-4 text-zinc-300">
        <div className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border border-zinc-900 rounded-xl">
          <Mail className="w-5 h-5 text-zinc-500 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email</span>
            <span className="text-sm truncate text-white">{user.email ?? 'No email associated'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 bg-zinc-950/40 border border-zinc-900 rounded-xl">
          <Award className="w-5 h-5 text-zinc-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Recommendations</span>
            <span className="text-sm text-white font-medium">{user.reccCount}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <form action={SignOut} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
