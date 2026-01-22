import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/lib/types';
import { ArrowUpRight, Github } from 'lucide-react';

export function ProjectsSection({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="w-full py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">My Projects</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Here are some of the projects I've built and contributed to.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map(project => (
            <Card key={project.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <Image
                  src={project.imageUrl}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="object-cover aspect-[3/2] w-full"
                  data-ai-hint="project screenshot"
                />
              </CardHeader>
              <div className="p-6 flex flex-col flex-1">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
                <CardContent className="p-0 flex-1">
                  <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
                </CardContent>
                <CardFooter className="p-0 pt-6 space-x-2">
                  {project.liveUrl && (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button asChild className="flex-1">
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
