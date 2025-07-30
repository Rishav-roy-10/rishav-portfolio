import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Code, Coffee, BookOpen, Target } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Focus",
      description: "Building end-to-end applications with modern technologies"
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Problem Solver",
      description: "Love tackling complex challenges with clean, efficient code"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Continuous Learner",
      description: "Always exploring new frameworks and best practices"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Oriented",
      description: "Focused on delivering quality solutions that make a difference"
    }
  ];

  const interests = [
    "Web Development",
    "React & JavaScript", 
    "Node.js",
    "Database Design",
    "UI/UX Design",
    "Open Source",
    "Tech Innovation"
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer on a journey to master full-stack development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start mb-8">
              <Avatar className="h-48 w-48 border-4 border-primary/20 shadow-xl">
                <AvatarImage 
                  src="/lovable-uploads/9fa23230-01ae-4eed-896c-f94a617a9e93.png" 
                  alt="Rishav Roy" 
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl font-bold bg-primary/10">
                  RR
                </AvatarFallback>
              </Avatar>
            </div>
            <Card className="card-glow border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">My Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I'm Rishav Roy, a dedicated full-stack developer passionate about 
                  building modern web applications. My journey began with curiosity about how 
                  websites work and has evolved into a passion for creating meaningful digital experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code and staying up-to-date with the latest 
                  technologies. Every project is an opportunity to learn something new and push the 
                  boundaries of what's possible.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Interests & Passions</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-secondary/80 hover:bg-primary/20 transition-colors"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <Card 
                key={index} 
                className="card-glow border-border/50 bg-card/50 backdrop-blur-sm hover:animate-glow transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 