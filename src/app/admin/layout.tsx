
import React from 'react';
import Link from 'next/link';
import { Code2 } from 'lucide-react';

function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">Portfolify</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Back to Home
        </Link>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-muted/40">
        <AdminHeader />
        <main>{children}</main>
      </div>
  );
}
