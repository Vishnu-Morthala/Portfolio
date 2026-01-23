import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Certificate } from '@/lib/types';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function CertificatesSection({ data }: { data: Certificate[] }) {
  return (
    <section id="certificates" className="w-full bg-muted/70 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Certificates & Credentials</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            My commitment to continuous learning and professional development.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cert) => (
            <Card key={cert.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="leading-tight">{cert.name}</CardTitle>
                  <CardDescription className="mt-1">Issued by {cert.issuer}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">Completed: {cert.date}</p>
              </CardContent>
              {cert.credentialUrl && (
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      View Credential <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
