import { motion } from 'framer-motion'

const Timeline = ({ items }) => {
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  }

  return (
    <motion.div
      variants={timelineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative max-w-3xl mx-auto"
    >
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-teal-400 h-full"></div>
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'} sm:pr-12 sm:pl-12`}
          >
            <motion.div
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-2xl animate-glow"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{item.date}</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
            </motion.div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-glow"></div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Timeline