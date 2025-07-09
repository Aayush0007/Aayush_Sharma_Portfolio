import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', to: '/#blog' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navLinks.forEach((link) => {
        if (link.id) {
          const section = document.getElementById(link.id);
          if (section) {
            const { offsetTop, offsetHeight } = section;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(link.id);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed w-full bg-gradient-to-r from-white/80 to-blue-100/80 dark:from-gray-800/80 dark:to-teal-900/80 md:bg-white/70 md:dark:bg-gray-800/70 md:backdrop-blur-md border-b border-blue-200 dark:border-teal-700 shadow-lg z-50 h-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <motion.img
              src={Logo}
              alt="Aayush Sharma"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 dark:ring-teal-300 cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => scrollToSection('home')}
            />
          </div>
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className={`relative px-3 py-2 rounded-md text-sm font-medium font-inter ${
                  activeSection === link.id
                    ? 'text-white bg-gradient-to-r from-blue-500 to-teal-400 shadow-glow'
                    : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400'
                }`}
              >
                {link.to ? (
                  <Link to={link.to} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ) : (
                  <button onClick={() => scrollToSection(link.id)}>
                    {link.name}
                  </button>
                )}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 transition-transform duration-300 ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
                <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
              </motion.div>
            ))}
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-secondary"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md fixed inset-0 top-16 z-40"
        >
          <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium font-inter ${
                  activeSection === link.id
                    ? 'text-white bg-gradient-to-r from-blue-500 to-teal-400 shadow-glow'
                    : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400'
                }`}
              >
                {link.to ? (
                  <Link to={link.to} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ) : (
                  <button onClick={() => scrollToSection(link.id)}>
                    {link.name}
                  </button>
                )}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 transition-transform duration-300 ${
                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </motion.div>
            ))}
            <div className="px-4 py-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;