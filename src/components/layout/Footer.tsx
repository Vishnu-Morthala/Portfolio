import type { AboutData } from '@/lib/types';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer({ data }: { data: AboutData }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-20 flex-col items-center justify-center gap-4 px-4 text-center md:h-16 md:flex-row md:justify-between md:px-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {data.name}. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-2">
            {data.socials.github && (
              <Link href={data.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                </Button>
              </Link>
            )}
            {data.socials.linkedin && (
              <Link href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                </Button>
              </Link>
            )}
            {data.socials.twitter && (
              <Link href={data.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                </Button>
              </Link>
            )}
        </div>
      </div>
    </footer>
  );
}
