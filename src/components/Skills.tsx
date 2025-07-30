import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code2, 
  Database, 
  Palette, 
  Server,
  Globe,
  Settings
} from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 className="h-6 w-6" />,
      skills: [
        { name: "React", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "HTML/CSS", level: 85 }
      ]
    },
    {
      title: "Backend", 
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 }
      ]
    },
    {
      title: "Database",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "MongoDB", level: 70 },
        { name: "PostgreSQL", level: 65 },
        { name: "MySQL", level: 60 }
      ]
    },
    {
      title: "Tools & Others",
      icon: <Settings className="h-6 w-6" />,
      skills: [
        { name: "Git & GitHub", level: 80 },
        { name: "VS Code", level: 90 }
      ]
    }
  ];

  const technologies = [
    "React", "JavaScript", "Node.js", "Express.js", "HTML/CSS",
    "MongoDB", "PostgreSQL", "Tailwind CSS", "Git"
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="card-glow border-border/50 bg-card/50 backdrop-blur-sm hover:animate-glow transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-glow border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <span>Technologies I Work With</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-secondary/80 hover:bg-primary/20 transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;