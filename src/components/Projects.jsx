import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";
import todoApp from "@/assets/todo-app.png";
import passwordGenerator from "@/assets/password-generator.png";
import weatherApp from "@/assets/Weather-app.png";
import qrGenerator from "@/assets/QR-generator.png";

const Projects = () => {
  const projects = [
    {
      title: "Password Manager",
      description: "A secure password management application with local storage functionality. Features password generation, copy-to-clipboard, and encrypted storage for managing all your credentials safely.",
      technologies: ["React", "Local Storage", "Tailwind CSS", "TypeScript"],
      image: "/lovable-uploads/65a62005-1811-4946-bc8d-54f028724671.png",
      liveUrl: "https://password-manager-eta-sage.vercel.app/",
      githubUrl: "https://github.com",
      status: "Completed"
    },
    {
      title: "TO-DO-List App",
      description: "A clean and intuitive task management application with add, delete, and mark complete functionality. Features a modern UI with smooth animations and local storage.",
      technologies: ["React", "JavaScript", "CSS3", "Local Storage"],
      image: todoApp,
      liveUrl: "https://rishav-roy-10.github.io/To-do-list/",
      githubUrl: "https://github.com",
      status: "Completed"
    },
    {
      title: "Password Generator",
      description: "A secure random password generator with customizable length and character options. Features copy-to-clipboard functionality and strength indicators.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Crypto API"],
      image: passwordGenerator,
      liveUrl: "https://rishav-roy-10.github.io/Password-generator/",
      githubUrl: "https://github.com",
      status: "Completed"
    },
    {
      title: "Weather App",
      description: "A responsive weather application that displays current weather conditions with beautiful gradients. Features city search, humidity, and wind speed data.",
      technologies: ["React", "Weather API", "CSS3", "Geolocation API"],
      image: weatherApp,
      liveUrl: "https://rishav-roy-10.github.io/Weather-App/", 
      githubUrl: "https://github.com",
      status: "Completed"
    },
    {
      title: "QR Code Generator",
      description: "A simple QR code generator that converts text or URLs into QR codes. Features instant generation, downloadable codes, and responsive design.",
      technologies: ["JavaScript", "QR.js Library", "HTML5", "CSS3"],
      image: qrGenerator,
      liveUrl: "https://rishav-roy-10.github.io/QR-code-generetor/",
      githubUrl: "https://github.com",
      status: "Completed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Some of the projects I've worked on during my development journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="card-glow border-border/50 bg-card/50 backdrop-blur-sm hover:animate-glow transition-all duration-300 group"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(project.status)} border`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-secondary/80 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    variant="portfolio" 
                    size="sm" 
                    asChild
                  >
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            asChild
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <Github className="h-5 w-5" />
              <span>View All Projects on GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects; 