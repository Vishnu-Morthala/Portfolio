
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AboutData } from '@/lib/types';
import { Mail, Github, Linkedin, Twitter, Phone } from 'lucide-react';
import Link from 'next/link';

export function ContactSection({ data }: { data: AboutData }) {
  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-muted/70">
      <div className="container">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Get in Touch</CardTitle>
            <CardDescription className="mt-2 md:text-lg">I'm always open to discussing new projects, creative ideas, or opportunities.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href={`mailto:${data.contactEmail}`}>
                  <Mail className="mr-2 h-5 w-5" /> {data.contactEmail}
                </Link>
              </Button>
              {data.contactPhone && (
                <Button asChild size="lg" variant="outline">
                  <Link href={`tel:${data.contactPhone}`}>
                    <Phone className="mr-2 h-5 w-5" /> {data.contactPhone}
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex items-center justify-center gap-4">
              {data.socials.github && (
                <Link href={data.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Button variant="outline" size="icon">
                    <Github className="h-6 w-6"/>
                  </Button>
                </Link>
              )}
              {data.socials.linkedin && (
                <Link href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-6 w-6"/>
                  </Button>
                </Link>
              )}
              {data.socials.twitter && (
                <Link href={data.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-6 w-6"/>
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
