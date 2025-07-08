import { motion } from 'framer-motion'

const SkillCard = ({ icon: Icon, name, description, proficiency, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, type: 'spring', stiffness: 100 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group inline-flex flex-col items-center mx-3 sm:mx-4 relative"
      whileHover={{ scale: 1.2, filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }}
      animate={{
        y: [0, -3, 0],
        transition: { duration: 1.5, repeat: Infinity, delay: index * 0.15 },
      }}
    >
      <Icon
        size={32}
        className="text-blue-500 dark:text-teal-300 mb-1 group-hover:text-secondary animate-glow"
      />
      <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 text-center">
        {name}
      </span>
      <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 text-xs text-gray-600 dark:text-gray-300 w-40 text-center z-10">
        <p>{description}</p>
        <p className="text-secondary mt-1">Proficiency: {proficiency}</p>
      </div>
    </motion.div>
  )
}

export default SkillCard