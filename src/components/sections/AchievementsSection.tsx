import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Achievement } from '@/lib/types';
import { Award, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function AchievementsSection({ data }: { data: Achievement[] }) {
  return (
    <section id="achievements" className="w-full py-20 md:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            My Achievements
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A collection of my proudest accomplishments and recognitions.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((achievement) => (
            <Card key={achievement.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
              <Image
                  src={achievement.imageUrl}
                  width={600}
                  height={400}
                  alt={achievement.title}
                  className="object-cover aspect-[3/2] w-full"
                  data-ai-hint="achievement certificate"
                />
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                 <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="leading-tight">{achievement.title}</CardTitle>
                    <CardDescription className="mt-1">Date: {achievement.date}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
              {achievement.certificateUrl && (
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={achievement.certificateUrl} target="_blank" rel="noopener noreferrer">
                      View Certificate <ExternalLink className="ml-2 h-4 w-4" />
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
