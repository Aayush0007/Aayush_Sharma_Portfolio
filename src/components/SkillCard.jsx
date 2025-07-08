import { motion } from 'framer-motion'

const SkillCard = ({ icon: Icon, name, description, proficiency, index }) => {
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
      className="relative perspective-1000"
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      <motion.div
        className="relative w-full h-32 sm:h-36 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-2xl animate-glow"
        animate={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <Icon size={32} className="text-blue-500 dark:text-teal-300 mb-2" />
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">{name}</h4>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 backface-hidden rotate-y-180">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">{name}</h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
          <p className="text-xs sm:text-sm text-secondary mt-2">Proficiency: {proficiency}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SkillCard