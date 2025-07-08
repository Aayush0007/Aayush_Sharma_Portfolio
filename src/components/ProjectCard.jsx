import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, type: 'spring', stiffness: 100 } },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-2xl overflow-hidden animate-glow"
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="relative h-48 sm:h-56">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Project+Image')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 bg-blue-500/20 dark:bg-teal-300/20 text-xs sm:text-sm text-blue-500 dark:text-teal-300 rounded-full"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary"
            >
              <FaGithub size={20} />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary"
            >
              <FaExternalLinkAlt size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard