'use client';
import { useState } from 'react';
import { Code2, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '/achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

const NavLink = ({ href, children, onClick, isHomePage }: { href: string; children: React.ReactNode, onClick?: () => void, isHomePage: boolean }) => {
  const isScrollLink = href.startsWith('#');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header height
        behavior: 'smooth',
      });
    }
    if (onClick) onClick();
  };

  if (isHomePage && isScrollLink) {
    return (
      <a href={href} onClick={handleScroll} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground md:text-sm">
        {children}
      </a>
    );
  }
  
  // Handle page links or scroll links from other pages
  return (
    <Link href={isScrollLink ? `/${href}` : href} onClick={onClick} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground md:text-sm">
      {children}
    </Link>
  );
};


export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">Portfolify</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map(item => (
            <NavLink key={item.href} href={item.href} isHomePage={isHomePage}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
               <div className="flex flex-col items-center justify-center h-full">
                <nav className="flex flex-col items-center space-y-8">
                    {navItems.map(item => (
                    <NavLink key={item.href} href={item.href} isHomePage={isHomePage} onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
                    ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
