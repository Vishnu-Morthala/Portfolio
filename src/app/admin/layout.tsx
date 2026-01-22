'use client'

import React from 'react';
import Link from 'next/link';
import { AuthGuard } from './components/AuthGuard';
import { Button } from '@/components/ui/button';
import { Code2, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function AdminHeader() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully.' });
      router.push('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Logout failed.' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-bold">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">Portfolify Admin</span>
        </Link>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/40">
        <AdminHeader />
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}
