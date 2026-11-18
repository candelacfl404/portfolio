export const portfolioData = {
  personal: {
    name: "Pri",
    fullName: "Pri Developer",
    role: "Desarrolladora FullStack",
    tagline: "Desarrollo aplicaciones web modernas, escalables y visualmente impecables.",
    bio: "Combino arquitectura técnica robusta en React y Node.js con un criterio visual minucioso. Mi objetivo es crear software eficiente, accesible y con experiencias de usuario memorables.",
    location: "Buenos Aires, Argentina",
    availability: "Disponible para nuevas oportunidades",
    github: "https://github.com/pri-dev",
    linkedin: "https://linkedin.com",
    email: "pri.dev.contacto@gmail.com"
  },

  skills: [
    {
      category: "Frontend",
      items: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5 Semántico", "CSS3 / Grid & Flexbox", "Tailwind / Vanilla CSS", "Vite"]
    },
    {
      category: "Backend & Datos",
      items: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "MongoDB", "Autenticación JWT"]
    },
    {
      category: "Herramientas & Prácticas",
      items: ["Git & GitHub", "Figma to Code", "Accesibilidad Web (a11y)", "Optimización Web & SEO", "Clean Code & Arquitectura"]
    }
  ],

  softSkills: [
    "Comunicación asertiva",
    "Resolución de problemas",
    "Trabajo colaborativo",
    "Pensamiento analítico",
    "Adaptabilidad ágil",
    "Gestión del tiempo & autonomía",
    "Atención al detalle y UX"
  ],

  projects: [
    {
      id: "analytica-suite",
      number: "01",
      title: "Analytica Cloud Suite",
      category: "Full Stack / SaaS",
      year: "2026",
      image: "/images/project-saas.jpg",
      description: "Plataforma de métricas y telemetría analítica en tiempo real para monitorizar arquitecturas distribuidas y flujos de datos.",
      tech: ["React", "Node.js", "WebSockets", "Vite", "Canvas API"],
      liveUrl: "https://ejemplo.com/analytica",
      githubUrl: "https://github.com/ejemplo/analytica-suite"
    },
    {
      id: "lumina-architecture",
      number: "02",
      title: "Lumina Studio",
      category: "Frontend / Editorial",
      year: "2025",
      image: "/images/project-agency.jpg",
      description: "Catálogo interactivo y plataforma editorial con diseño tipográfico vanguardista, transiciones fluidas y alta fidelidad visual.",
      tech: ["React", "CSS3 Moderno", "Vite", "UX Editorial"],
      liveUrl: "https://ejemplo.com/lumina",
      githubUrl: "https://github.com/ejemplo/lumina-studio"
    },
    {
      id: "nexus-flow",
      number: "03",
      title: "Nexus Task Engine",
      category: "Full Stack / Herramienta",
      year: "2025",
      image: "/images/project-nexus.jpg",
      description: "Herramienta visual para conectar servicios, automatizar flujos de trabajo y orquestar tareas interactivas sobre un lienzo ágil.",
      tech: ["React", "Node.js", "SVG Connections", "State Engine"],
      liveUrl: "https://ejemplo.com/nexus",
      githubUrl: "https://github.com/ejemplo/nexus-flow"
    },
    {
      id: "aura-audio",
      number: "04",
      title: "Aura Wave Synth",
      category: "Creative Engineering",
      year: "2024",
      image: "/images/project-aura.jpg",
      description: "Sintetizador web interactivo y analizador de frecuencias sonoras con visualización reactiva en tiempo real sobre Canvas.",
      tech: ["JavaScript", "Web Audio API", "HTML5 Canvas", "Algoritmos DSP"],
      liveUrl: "https://ejemplo.com/aura",
      githubUrl: "https://github.com/ejemplo/aura-audio"
    }
  ],

  contact: {
    heading: "¿Tienes un proyecto en mente? Trabajemos juntos.",
    subheading: "Estoy disponible para nuevos proyectos, colaboraciones técnicas y desarrollo de soluciones de alto impacto.",
    email: "pri.dev.contacto@gmail.com",
    city: "Buenos Aires, Argentina",
    channels: [
      {
        name: "Email",
        label: "pri.dev.contacto@gmail.com",
        action: "mailto:pri.dev.contacto@gmail.com",
        type: "email"
      },
      {
        name: "LinkedIn",
        label: "linkedin.com/in/pri-developer",
        action: "https://linkedin.com",
        type: "external"
      },
      {
        name: "GitHub",
        label: "github.com/pri-dev",
        action: "https://github.com",
        type: "external"
      }
    ]
  }
};
