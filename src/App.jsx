import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  Mail,
  ExternalLink,
  ArrowRight,
  Code2,
  Zap,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import "./App.css";

const GitHubIcon = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.33-5.466-5.93 0-1.31.47-2.382 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.838 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.92.43.37.81 1.096.81 2.21 0 1.596-.014 2.884-.014 3.276 0 .32.217.694.825.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
);

const LinkedInIcon = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M4.98 3.5C4.98 2.12 6.1 1 7.48 1s2.5 1.12 2.5 2.5S8.86 6 7.48 6 4.98 4.88 4.98 3.5zM2 8h5v12H2V8zm7 0h4.8v1.71h.07c.67-1.27 2.3-2.61 4.72-2.61 5.05 0 5.98 3.33 5.98 7.66V20H18v-6.64c0-1.58-.03-3.62-2.2-3.62-2.2 0-2.53 1.71-2.53 3.48V20H7V8z" />
  </svg>
);

// Particle Component
const Particles = ({ isDark }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: isDark ? 50 : 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 0.5,
      size: Math.random() * 3 + 1,
      color: isDark ? "cyan" : Math.random() > 0.5 ? "cyan" : "blue",
    }));
    setParticles(newParticles);
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark
              ? "bg-cyan-400/40"
              : particle.color === "cyan"
                ? "bg-cyan-400/50 shadow-lg shadow-cyan-300/50"
                : "bg-blue-400/50 shadow-lg shadow-blue-300/50"
          }`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: isDark ? [1, 1, 1] : [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

// Shooting Stars Component
const ShootingStars = ({ isDark }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute w-1 h-1 ${
            isDark ? "bg-yellow-300/80" : "bg-yellow-200/60"
          } rounded-full shadow-lg`}
          style={{
            boxShadow: isDark
              ? "0 0 6px rgba(253, 224, 71, 0.8), 0 0 12px rgba(253, 224, 71, 0.5)"
              : "0 0 4px rgba(253, 224, 71, 0.6), 0 0 8px rgba(253, 224, 71, 0.3)",
          }}
          initial={{ x: "-10%", y: "110%", opacity: 0 }}
          animate={{ x: "110vw", y: "-10%", opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { scrollY } = useScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animated background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  const projects = [
    {
      title: "Vision-Based AI Assistant",
      description:
        "A real-time intelligent assistant with object detection, contextual response, and predictive safety monitoring capabilities.",
      tags: ["Python", "OpenCV", "Computer Vision"],
      link: "#",
      image: "🤖",
    },
    {
      title: "Offline LAN Communication Suite",
      description:
        "Built a LAN-based communication system for real-time text chatting and voice calling without internet, working through a shared local Wi-Fi network.",
      tags: [
        "Node.js",
        "Socket.io",
        "WebRTC",
        "Network Programming",
        "JavaScript",
      ],
      link: "#",
      image: "📡",
    },
    {
      title: "Smart Street Light System",
      description:
        "An IoT-based automated lighting system with adaptive brightness control and remote monitoring.",
      tags: ["IoT", "Sensors", "Microcontrollers", "Embedded Systems"],
      link: "#",
      image: "💡",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Tailwind CSS",
        "UI/UX Design",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "MySQL", "MongoDB"],
    },
    {
      category: "Tools & Technologies",
      items: [
        "Python",
        "C",
        "C++",
        "GitHub",
        "Linux",
        "Vercel",
        "VS Code",
        "OpenCV",
        "Microcontrollers",
        "IoT Platforms",
      ],
    },
  ];

  const experience = [
    {
      title: "Application Designing and Development Intern",
      company: "Information Technology Sector, Home Department",
      location: "Government of Sikkim",
      duration: "July 2025 – September 2025",
      responsibilities: [
        "Led the UI/UX design and development of a Management Information System",
        "Digitized departmental records for improved accessibility",
        "Improved workflow management through centralized software solutions",
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:officialchdeepusingh@gmail.com",
    },
    {
      icon: GitHubIcon,
      label: "GitHub",
      href: "https://github.com/deipuseingh",
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      href: "https://linkedin.com/in/chdeepusingh",
    },
  ];

  const bgColor = isDark
    ? "bg-slate-950 text-white"
    : "bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900";
  const navBg = isDark
    ? "bg-slate-950/80 border-cyan-500/20"
    : "bg-white/80 border-cyan-500/10";
  const sectionBg = isDark ? "bg-slate-900/50" : "bg-white/40 backdrop-blur-sm";
  const cardBg = isDark
    ? "from-slate-800 to-slate-900"
    : "from-white/40 to-white/20";
  const cardBorder = isDark ? "border-cyan-500/20" : "border-cyan-500/10";
  const textSecondary = isDark ? "text-gray-300" : "text-slate-700";

  return (
    <div className={`relative overflow-hidden ${bgColor}`}>
      <Particles isDark={isDark} />
      <ShootingStars isDark={isDark} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 ${navBg} backdrop-blur-md border-b transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Deepu Singh
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {[
                "Home",
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Contact",
              ].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  className={`${
                    isDark ? "text-gray-300" : "text-slate-700"
                  } hover:text-cyan-400 transition-colors font-medium`}
                >
                  {item}
                </motion.a>
              ))}

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-200 hover:bg-slate-300"
                } transition-colors`}
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-slate-600" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-200 hover:bg-slate-300"
                } transition-colors`}
              >
                {isDark ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-slate-600" />
                )}
              </motion.button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isDark ? "text-gray-300" : "text-slate-700"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden py-4 border-t ${
                isDark ? "border-cyan-500/20" : "border-cyan-500/10"
              }`}
            >
              {[
                "Home",
                "About",
                "Experience",
                "Projects",
                "Skills",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 ${
                    isDark ? "text-gray-300" : "text-slate-700"
                  } hover:text-cyan-400 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        className={`relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
        style={{ y: backgroundY }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-1/4 -left-1/3 w-96 h-96 rounded-full mix-blend-screen blur-3xl opacity-20 ${
              isDark
                ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                : "bg-gradient-to-r from-cyan-300 to-blue-400"
            }`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-1/4 -right-1/3 w-96 h-96 rounded-full mix-blend-screen blur-3xl opacity-20 ${
              isDark
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-gradient-to-r from-purple-400 to-pink-400"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl font-bold mb-6"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                Hi, I'm{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Chingangbam Deepu Singh
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-xl sm:text-2xl ${textSecondary} mb-8 leading-relaxed`}
            >
              Computer Science undergraduate passionate about AI, IoT, and
              Full-Stack Development, creating scalable software solutions and
              innovative technology-driven systems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                View My Work <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="mt-16 text-5xl"
          >
            💻
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <p
            className={`${isDark ? "text-gray-400" : "text-slate-600"} text-sm mb-2`}
          >
            Scroll to explore
          </p>
          <div
            className={`w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center`}
          >
            <motion.div className="w-1 h-2 bg-cyan-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${sectionBg} transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-12 text-center"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                About{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`text-lg ${textSecondary} leading-relaxed space-y-6`}
              >
                <p>
                  I'm a Computer Science undergraduate specializing in
                  Artificial Intelligence, Internet of Things, and Full-Stack
                  Development. With over 1+ years of hands-on experience, I've
                  developed a strong passion for creating innovative solutions
                  that bridge the gap between AI, hardware, and user-centric
                  software.
                </p>
                <p>
                  My journey started with curiosity about how modern
                  technologies work, and it has evolved into a deep passion for
                  building intelligent systems, IoT applications, and seamless
                  digital experiences.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring emerging
                  technologies, contributing to open-source projects, or
                  brainstorming innovative solutions to real-world problems.
                </p>
              </motion.div>

              <motion.div
                variants={scrollVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
              >
                {[
                  {
                    icon: Code2,
                    title: "Clean Code",
                    desc: "Writing maintainable, scalable code",
                  },
                  {
                    icon: Zap,
                    title: "Performance",
                    desc: "Optimizing for speed and efficiency",
                  },
                  {
                    icon: Globe,
                    title: "Innovation",
                    desc: "Creating solutions to real-world problems",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    className={`flex gap-4 p-4 rounded-lg bg-gradient-to-br ${cardBg} border ${cardBorder} hover:border-cyan-500/50 transition-colors`}
                  >
                    <motion.div
                      className="text-cyan-400 flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <item.icon size={24} />
                    </motion.div>
                    <div>
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          isDark
                            ? "text-white"
                            : "text-slate-900 hover:text-cyan-600"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={isDark ? "text-gray-400" : "text-slate-600"}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-12 text-center"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                Work{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>

            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={scrollVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`rounded-xl bg-gradient-to-br ${cardBg} border ${cardBorder} hover:border-cyan-500/50 p-8 transition-all duration-300 ${
                    !isDark ? "hover:shadow-lg hover:shadow-cyan-400/40" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className={`text-2xl font-bold transition-all duration-300 ${
                          isDark
                            ? "text-white hover:text-cyan-400"
                            : "text-slate-900 hover:text-cyan-600 hover:translate-x-1"
                        }`}
                      >
                        {exp.title}
                      </h3>
                      <p className="text-cyan-400 font-semibold">
                        {exp.company}
                      </p>
                      <p
                        className={isDark ? "text-gray-400" : "text-slate-600"}
                      >
                        {exp.location}
                      </p>
                    </div>
                    <span className="hidden md:block text-sm px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className={`space-y-2 ${textSecondary}`}>
                    {exp.responsibilities.map((resp, respIdx) => (
                      <li key={respIdx} className="flex gap-3">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${sectionBg} transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-12 text-center"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                Featured{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={scrollVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -10 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`group relative rounded-xl bg-gradient-to-br ${cardBg} border ${cardBorder} hover:border-cyan-500/50 overflow-hidden transition-all duration-300 ${
                    !isDark ? "hover:shadow-lg hover:shadow-cyan-300/50" : ""
                  }`}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDark
                        ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                        : "bg-gradient-to-br from-cyan-400/20 to-blue-400/20"
                    }`}
                  />

                  <div className="relative p-6 h-full flex flex-col">
                    <motion.div
                      className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      {project.image}
                    </motion.div>
                    <h3
                      className={`text-xl font-bold mb-3 transition-all duration-300 ${
                        isDark
                          ? "text-white group-hover:text-cyan-300"
                          : "text-slate-900 group-hover:text-cyan-600"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className={`${textSecondary} mb-6 flex-grow`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={project.link}
                      whileHover={{ x: 5 }}
                      className="text-cyan-400 font-semibold flex items-center gap-2 hover:text-cyan-300 transition-colors"
                    >
                      View Project <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${sectionBg} transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-12 text-center"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                My{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  variants={scrollVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div
                    className={`rounded-lg bg-gradient-to-br ${cardBg} p-8 border ${cardBorder} hover:border-cyan-500/50 transition-colors`}
                  >
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                      {skillGroup.category}
                    </h3>
                    <div className="space-y-3">
                      {skillGroup.items.map((skill, skillIdx) => (
                        <motion.div
                          key={skillIdx}
                          whileHover={{ x: 5 }}
                          className={`flex items-center gap-3 ${textSecondary} hover:text-cyan-400 transition-colors`}
                        >
                          <div className="w-2 h-2 rounded-full bg-cyan-400" />
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              <span className={isDark ? "text-white" : "text-slate-900"}>
                Let's{" "}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className={`text-xl ${textSecondary} mb-12`}
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to contribute to an exciting team.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 mb-8"
            >
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-slate-800 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/10"
                      : "bg-white border border-cyan-500/10 text-slate-800 hover:bg-cyan-100"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer
        className={`border-t ${
          isDark
            ? "border-cyan-500/20 bg-slate-900/50"
            : "border-cyan-500/10 bg-white/30"
        } py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
      >
        <div
          className={`max-w-6xl mx-auto text-center ${isDark ? "text-gray-400" : "text-slate-600"}`}
        >
          <p>
            © 2026 Chingangbam Deepu Singh. All rights reserved. Built with
            React, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
