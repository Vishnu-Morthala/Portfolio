import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Skill } from '@/lib/types';
import { Code, Users, Wrench } from 'lucide-react';

const categoryIcons: Record<Skill['category'], React.ReactNode> = {
  technical: <Code className="h-8 w-8 text-primary" />,
  soft: <Users className="h-8 w-8 text-primary" />,
  tool: <Wrench className="h-8 w-8 text-primary" />,
};

export function SkillsSection({ data }: { data: Skill[] }) {
  const technicalSkills = data.filter(s => s.category === 'technical');
  const softSkills = data.filter(s => s.category === 'soft');
  const toolSkills = data.filter(s => s.category === 'tool');

  return (
    <section id="skills" className="w-full bg-muted/70 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">My Skills</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A look at the technical abilities, tools, and soft skills I bring to the table.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4">
              {categoryIcons.technical}
              <CardTitle className="text-2xl font-headline">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {technicalSkills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="text-base px-4 py-2 rounded-lg">{skill.name}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4">
              {categoryIcons.soft}
              <CardTitle className="text-2xl font-headline">Soft Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {softSkills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="text-base px-4 py-2 rounded-lg">{skill.name}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center gap-4">
              {categoryIcons.tool}
              <CardTitle className="text-2xl font-headline">Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {toolSkills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="text-base px-4 py-2 rounded-lg">{skill.name}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
