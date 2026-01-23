'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Send, Twitter } from 'lucide-react';
import type { AboutData } from '@/lib/types';
import Link from 'next/link';

export function HeroSection({ data }: { data: AboutData }) {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="about" className="w-full py-20 md:py-32 lg:py-40">
      <div className="container grid items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1 flex flex-col items-center justify-center gap-6">
          <Image
            src={data.profilePictureUrl}
            width={400}
            height={400}
            alt={data.name}
            className="rounded-full object-cover aspect-square shadow-2xl shadow-primary/20 border-4 border-primary/10"
            data-ai-hint="profile picture"
            priority
          />
           <div className="flex items-center justify-center lg:justify-start gap-4">
              {data.socials.github && (
                <Link href={data.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Button variant="outline" size="icon">
                    <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                  </Button>
                </Link>
              )}
              {data.socials.linkedin && (
                <Link href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                  </Button>
                </Link>
              )}
              {data.socials.twitter && (
                <Link href={data.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground"/>
                  </Button>
                </Link>
              )}
            </div>
        </div>
        <div className="order-1 lg:order-2 space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              {data.name}
            </h1>
            <h2 className="text-2xl font-medium text-primary tracking-wide">{data.headline}</h2>
            <p className="max-w-[700px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
              {data.introduction}
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start pt-4">
            <Button size="lg" onClick={handleContactClick}>
              <Send className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
