import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import {
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaChevronDown,
} from "react-icons/fa";
import ProfileImg from "../assets/profile.jpg";
const Home = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: isMobile ? 40 : 80,
          density: { enable: true, value_area: 1000 },
        },
        color: { value: ["#3b82f6", "#10b981", "#f43f5e", "#8b5cf6"] },
        shape: {
          type: ["circle", "triangle", "star"],
          polygon: { nb_sides: 5 },
        },
        opacity: { value: 0.5, random: true },
        size: { value: isMobile ? 2.5 : 3.5, random: true },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#3b82f6",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 2 : 4,
          direction: "none",
          random: true,
          straight: false,
        },
      },
      interactivity: {
        detectOn: "canvas",
        events: {
          onHover: { enable: !isMobile, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 },
        },
      },
      retinaDetect: true,
    });

    window.particlesJS("particles-bg", {
      particles: {
        number: {
          value: isMobile ? 20 : 40,
          density: { enable: true, value_area: 1200 },
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 1, random: true },
        move: {
          enable: true,
          speed: isMobile ? 1 : 2,
          direction: "none",
          random: true,
          straight: false,
        },
      },
      interactivity: { detectOn: "canvas", events: { resize: true } },
      retinaDetect: true,
    });

    return () => {
      ["particles-js", "particles-bg"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.pJSDom && window.pJSDom[0]) {
          window.pJSDom[0].pJS.fn.vendors.destroypJS();
          window.pJSDom = [];
          el.innerHTML = "";
        }
      });
    };
  }, []);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Crafting Scalable Apps",
        "AWS Cloud Architect",
        "React & Rust Developer",
        "Innovating with Code",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      backDelay: 1000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skills = ["React", "Rust", "AWS", "Node.js", "Docker", "PostgreSQL"];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden pt-20 sm:pt-24"
    >
      <div
        id="particles-bg"
        className="absolute inset-0 z-[-2] backdrop-blur-sm"
      ></div>
      <div id="particles-js" className="absolute inset-0 z-[-1]"></div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10"
      >
        <motion.img
          src={ProfileImg}
          alt="Aayush Sharma"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full mb-6 object-cover shadow-2xl ring-4 ring-gradient-to-r from-blue-500 to-teal-400 animate-glow"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200, duration: 0.8 }}
          variants={childVariants}
        />
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 shadow-glow"
          variants={childVariants}
        >
          Aayush Sharma
        </motion.h1>
        <motion.span
          ref={typedRef}
          className="text-xl sm:text-2xl md:text-3xl text-secondary font-semibold font-inter block mb-6 shadow-glow"
          variants={childVariants}
        ></motion.span>
        <motion.p
          className="mt-4 max-w-md sm:max-w-lg md:max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-200 font-inter"
          variants={childVariants}
        >
          Transforming ideas into fast, scalable, and user-centric solutions
          with cutting-edge technology.
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
          variants={childVariants}
        >
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-sm sm:text-base text-gray-800 dark:text-gray-200 rounded-full shadow-md hover:bg-secondary hover:text-white"
              variants={skillVariants}
              whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 flex justify-center gap-6 sm:gap-8"
          variants={childVariants}
        >
          {[
            { href: "https://github.com/Aayush0007", icon: FaGithub },
            {
              href: "https://www.linkedin.com/in/aayush-sharma-0477502a1/",
              icon: FaLinkedinIn,
            },
            { href: "https://x.com/AayushShar001", icon: FaTwitter },
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotateY: 180, scale: 1.2 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative overflow-hidden group"
            >
              <link.icon
                size={24}
                className="text-gray-700 dark:text-gray-300 group-hover:text-secondary z-10"
              />
              <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          variants={childVariants}
        >
          <motion.a
            href="/Aayush Sharma - Resume.pdf"
            download
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full shadow-lg hover:shadow-2xl backdrop-blur-sm hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500"
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Download Resume
          </motion.a>
          <motion.button
            onClick={scrollToProjects}
            className="px-6 py-3 bg-transparent border-2 rounded-full text-blue-500 dark:text-teal-300 border-blue-500 dark:border-teal-300 shadow-lg"
            whileHover={{
              scale: 1.1,
              y: -3,
              backgroundColor: "#3B82F6", // blue-500
              color: "#ffffff",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.button>
        </motion.div>
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <FaChevronDown
            size={28}
            className="text-gray-600 dark:text-gray-300 hover:text-secondary cursor-pointer animate-glow"
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
          />
        </motion.div>
      </motion.div>
      <svg
        className="absolute bottom-0 w-full h-16 sm:h-20 text-blue-100 dark:text-blue-900"
        viewBox="0 0 1440 100"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C360,50 1080,150 1440,100 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
};

export default Home;
