import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:shadow-glow"
      whileHover={{ scale: 1.1, rotate: 15 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        animate={{ rotate: theme === 'light' ? 0 : 180, opacity: theme === 'light' ? 1 : 0 }}
        className="absolute"
      >
        <FaSun size={20} className="text-yellow-500" />
      </motion.div>
      <motion.div
        animate={{ rotate: theme === 'light' ? -180 : 0, opacity: theme === 'light' ? 0 : 1 }}
        className="absolute"
      >
        <FaMoon size={20} className="text-blue-300" />
      </motion.div>
      <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
    </motion.button>
  )
}

export default ThemeToggle