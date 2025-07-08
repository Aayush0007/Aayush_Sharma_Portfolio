import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Typed from 'typed.js'
import Timeline from '../components/Timeline'
import SkillCard from '../components/SkillCard'
import { FaReact, FaNodeJs, FaDatabase, FaDocker, FaPython, FaJs, FaJava, FaCloud } from 'react-icons/fa'
import { timelineItems } from '../utils/constants'

const About = () => {
  const typedRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    window.particlesJS('particles-about', {
      particles: {
        number: { value: isMobile ? 30 : 60, density: { enable: true, value_area: 1200 } },
        color: { value: ['#3b82f6', '#10b981', '#8b5cf6'] },
        shape: { type: ['circle', 'triangle'], polygon: { nb_sides: 5 } },
        opacity: { value: 0.4, random: true },
        size: { value: isMobile ? 2 : 3, random: true },
        move: { enable: true, speed: isMobile ? 1.5 : 3, direction: 'none', random: true, straight: false },
      },
      interactivity: {
        detectOn: 'canvas',
        events: {
          onHover: { enable: !isMobile, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 0.3 } },
          push: { particles_nb: 2 },
        },
      },
      retinaDetect: true,
    })

    return () => {
      const el = document.getElementById('particles-about')
      if (el && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
        el.innerHTML = ''
      }
    }
  }, [])

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['AWS-certified full-stack developer', 'passionate about innovation', 'building scalable solutions'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1000,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  }

  const skills = [
    { icon: FaReact, name: 'React', description: 'Building dynamic UIs with React', proficiency: '90%' },
    { icon: FaNodeJs, name: 'Node.js', description: 'Scalable backend with Node.js', proficiency: '85%' },
    { icon: FaDatabase, name: 'PostgreSQL', description: 'Robust database management', proficiency: '80%' },
    { icon: FaDocker, name: 'Docker', description: 'Containerized deployments', proficiency: '75%' },
    { icon: FaPython, name: 'Python', description: 'Versatile scripting and automation', proficiency: '70%' },
    { icon: FaJs, name: 'JavaScript', description: 'Core web development', proficiency: '90%' },
    { icon: FaJava, name: 'Java', description: 'Enterprise-level applications', proficiency: '65%' },
    { icon: FaCloud, name: 'AWS', description: 'Cloud architecture and services', proficiency: '85%' },
  ]

  const scrollToTimeline = () => {
    const timelineSection = document.getElementById('timeline')
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden"
    >
      <div id="particles-about" className="absolute inset-0 z-[-1] backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 shadow-glow"
        >
          About Me
        </motion.h2>
        <motion.p
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-200 font-inter"
        >
          I’m Aayush Sharma, an <span ref={typedRef} className="text-secondary"></span> with expertise in React.js, Node.js, Rust, and AWS. I specialize in delivering high-performance applications with a focus on cloud architecture and DevOps.
        </motion.p>
        <motion.button
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={scrollToTimeline}
          className="mx-auto block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full shadow-lg hover:shadow-2xl backdrop-blur-sm hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 mb-12"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Learn More
        </motion.button>
        <motion.h3
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200 shadow-glow"
        >
          Skills
        </motion.h3>
        <div className="relative overflow-hidden mb-12">
          <div
            className="flex animate-scroll whitespace-nowrap"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)',
            }}
          >
            {[...skills, ...skills].map((skill, index) => (
              <SkillCard
                key={`${skill.name}-${index}`}
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
                proficiency={skill.proficiency}
                index={index}
              />
            ))}
          </div>
        </div>
        <motion.h3
          id="timeline"
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200 shadow-glow"
        >
          Experience & Education
        </motion.h3>
        <Timeline items={timelineItems} />
      </div>
      <svg
        className="absolute bottom-0 w-full h-16 sm:h-20 text-blue-100 dark:text-blue-900"
        viewBox="0 0 1440 100"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C360,50 1080,150 1440,100 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}

export default About