import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Achievement } from '@/lib/types';
import { ExternalLink, Trophy } from 'lucide-react';
import Link from 'next/link';

export function AchievementsSection({ data }: { data: Achievement[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" className="w-full bg-muted/70 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Achievements</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Key accomplishments and recognitions from my journey so far.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((achievement) => (
            <Card key={achievement.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                    src={achievement.imageUrl}
                    width={600}
                    height={400}
                    alt={achievement.title}
                    className="object-cover aspect-[3/2] w-full"
                    data-ai-hint="achievement document"
                  />
              </CardHeader>
              <div className="p-6 flex flex-col flex-1">
                <CardTitle className="mb-2 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" /> {achievement.title}
                </CardTitle>
                <CardContent className="p-0 flex-1">
                  <p className="text-muted-foreground whitespace-pre-line">{achievement.description}</p>
                </CardContent>
                {achievement.credentialUrl && (
                  <CardFooter className="p-0 pt-6">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={achievement.credentialUrl} target="_blank" rel="noopener noreferrer">
                        View Proof <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
