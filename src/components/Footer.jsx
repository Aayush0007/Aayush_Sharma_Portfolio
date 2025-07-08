import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import confetti from 'canvas-confetti'

const Footer = () => {
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    window.particlesJS('particles-footer', {
      particles: {
        number: { value: isMobile ? 20 : 40, density: { enable: true, value_area: 1500 } },
        color: { value: ['#3b82f6', '#10b981'] },
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

    return () => {
      const el = document.getElementById('particles-footer')
      if (el && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
        el.innerHTML = ''
      }
    }
  }, [])

  const handleLogoClick = () => {
    setClickCount(clickCount + 1)
    if (clickCount + 1 >= 5) {
      setShowEasterEgg(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#8b5cf6'],
      })
      setTimeout(() => setShowEasterEgg(false), 3000)
      setClickCount(0)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ]

  const socialLinks = [
    { href: 'https://linkedin.com/in/aayush-sharma0477502a1', icon: FaLinkedin },
    { href: 'https://github.com/Aayush0007', icon: FaGithub },
    { href: 'https://x.com/AayushShar001', icon: FaTwitter },
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    toast.success('Subscribed to newsletter!', {
      className: 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-glow',
    })
    e.target.reset()
  }

  return (
    <footer
      className="relative bg-gradient-to-r from-blue-900 to-teal-900 text-white py-12 overflow-hidden"
    >
      <div id="particles-footer" className="absolute inset-0 z-[-1] backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.div
              className="text-2xl sm:text-3xl font-playfair cursor-pointer"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Aayush Sharma
            </motion.div>
            <p className="mt-2 text-sm sm:text-base text-gray-300">
              AWS-certified full-stack developer crafting scalable solutions.
            </p>
            {showEasterEgg && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base mt-2 bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-lg shadow-glow"
              >
                Follow me on X: @AayushShar001! 🎉
              </motion.p>
            )}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm sm:text-base text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 rounded-md px-2 py-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200">Stay Connected</h3>
            <p className="mb-4 text-sm sm:text-base text-gray-300">
              Email:{' '}
              <a href="mailto:sharmaaayush2310@gmail.com" className="text-blue-300 hover:text-secondary">
                sharmaaayush2310@gmail.com
              </a>
            </p>
            <p className="mb-4 text-sm sm:text-base text-gray-300">
              Phone:{' '}
              <a href="tel:+919351044351" className="text-blue-300 hover:text-secondary">
                +91 93510 44351
              </a>
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center group"
                >
                  <link.icon size={24} className="text-gray-200 group-hover:text-secondary" />
                  <span className="absolute inset-0 bg-secondary/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
                </motion.a>
              ))}
            </div>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-200">Newsletter</label>
              <div className="flex">
                <motion.input
                  type="email"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:outline-none"
                  placeholder="Your email"
                  required
                  whileFocus={{ scale: 1.02, boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)' }}
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-r-lg shadow-lg hover:shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} Aayush Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer