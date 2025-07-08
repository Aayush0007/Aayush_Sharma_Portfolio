import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { getRepos } from '../utils/api'
import { projects } from '../utils/constants'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Projects = () => {
  const [repos, setRepos] = useState([])
  const [filter, setFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(0)
  const reposPerPage = 3

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    window.particlesJS('particles-projects', {
      particles: {
        number: { value: isMobile ? 20 : 40, density: { enable: true, value_area: 1500 } },
        color: { value: ['#3b82f6', '#10b981', '#8b5cf6'] },
        shape: { type: ['circle'], polygon: { nb_sides: 5 } },
        opacity: { value: 0.3, random: true },
        size: { value: isMobile ? 1.5 : 2.5, random: true },
        move: { enable: true, speed: isMobile ? 1 : 2, direction: 'none', random: true, straight: false },
      },
      interactivity: {
        detectOn: 'canvas',
        events: { resize: true },
      },
      retinaDetect: true,
    })

    const fetchRepos = async () => {
      try {
        const data = await getRepos()
        setRepos(data)
      } catch (error) {
        console.error('Failed to fetch repos:', error)
      }
    }
    fetchRepos()

    return () => {
      const el = document.getElementById('particles-projects')
      if (el && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
        el.innerHTML = ''
      }
    }
  }, [])

  const cachedRepos = useMemo(() => repos, [repos])

  const techStacks = ['All', 'React.js', 'Node.js', 'Rust', 'Docker', 'PostgreSQL']

  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.techStack.includes(filter))

  const handleNext = () => {
    if ((currentPage + 1) * reposPerPage < cachedRepos.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleDotClick = (page) => {
    setCurrentPage(page)
  }

  const currentRepos = cachedRepos.slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)
  const totalPages = Math.ceil(cachedRepos.length / reposPerPage)

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  }

  const repoVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden"
    >
      <div id="particles-projects" className="absolute inset-0 z-[-1] backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 shadow-glow"
        >
          Projects
        </motion.h2>
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {techStacks.map((tech, index) => (
            <motion.button
              key={tech}
              custom={index}
              variants={childVariants}
              whileHover={{ scale: 1.1, y: -3 }}
              onClick={() => setFilter(tech)}
              className={`relative px-4 py-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-sm sm:text-base font-medium font-inter ${
                filter === tech
                  ? 'text-white bg-gradient-to-r from-blue-500 to-teal-400 shadow-glow'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400'
              }`}
            >
              {tech}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 transition-transform duration-300 ${
                  filter === tech ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              ></span>
              <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
            </motion.button>
          ))}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        <motion.h3
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-semibold text-center mt-12 mb-8 text-gray-800 dark:text-gray-200 shadow-glow"
        >
          Check Out My GitHub Repos!
        </motion.h3>
        <motion.p
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-6 text-gray-600 dark:text-gray-300 font-inter"
        >
          Here’s some cool stuff I’ve been working on lately. Swipe through to see more!
        </motion.p>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="enter"
              animate="center"
              exit="exit"
              variants={repoVariants}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center"
            >
              {currentRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={childVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl animate-glow w-full sm:w-80"
                  whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{repo.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{repo.description || 'Just a cool project!'}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2 py-1 bg-blue-500/20 dark:bg-teal-300/20 text-xs sm:text-sm text-blue-500 dark:text-teal-300 rounded-full">
                      {repo.language || 'Code'}
                    </span>
                    <span className="text-xs sm:text-sm text-secondary">Stars: {repo.stargazers_count}</span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Updated: {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-lg transition-transform duration-300"></span>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
          {cachedRepos.length > reposPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <motion.button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="p-3 sm:p-4 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaArrowLeft size={20} />
              </motion.button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                      currentPage === index
                        ? 'bg-gradient-to-r from-blue-500 to-teal-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  ></motion.button>
                ))}
              </div>
              <motion.button
                onClick={handleNext}
                disabled={(currentPage + 1) * reposPerPage >= cachedRepos.length}
                className="p-3 sm:p-4 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaArrowRight size={20} />
              </motion.button>
            </div>
          )}
        </div>
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

export default Projects