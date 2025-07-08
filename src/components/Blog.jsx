import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { debounce } from 'lodash';
import { blogs } from '../utils/data';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('All');
  const blogsPerPage = 3;

  // Debounce filter changes to prevent rapid re-renders
  const debouncedSetFilter = useMemo(
    () =>
      debounce((value) => {
        setFilter(value);
        setCurrentPage(0);
      }, 300),
    []
  );

  // Memoize computed values to avoid unnecessary recalculations
  const sortedBlogs = useMemo(
    () =>
      filter === 'Latest'
        ? [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
        : blogs,
    [filter]
  );
  const filteredBlogs = useMemo(
    () =>
      filter === 'All' || filter === 'Latest'
        ? sortedBlogs
        : sortedBlogs.filter((blog) => blog.category === filter),
    [filter, sortedBlogs]
  );
  const currentBlogs = useMemo(
    () =>
      filteredBlogs.slice(
        currentPage * blogsPerPage,
        (currentPage + 1) * blogsPerPage
      ),
    [currentPage, filteredBlogs]
  );
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  useEffect(() => {
    // Only initialize particlesJS on desktop devices
    const isMobile = window.innerWidth < 640;
    if (!isMobile) {
      window.particlesJS('particles-blog', {
        particles: {
          number: { value: 30, density: { enable: true, value_area: 1500 } },
          color: { value: ['#3b82f6', '#10b981', '#8b5cf6'] },
          shape: { type: 'circle' },
          opacity: { value: 0.3, random: true },
          size: { value: 2, random: true },
          move: { enable: true, speed: 1.5 },
        },
      });
    }

    return () => {
      // Robust cleanup for particlesJS
      if (window.pJSDom?.[0]?.pJS) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
      const el = document.getElementById('particles-blog');
      if (el) el.innerHTML = '';
    };
  }, []);

  const handleNext = () => {
    if ((currentPage + 1) * blogsPerPage < filteredBlogs.length) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  };

const handlePrev = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  } else {
    setCurrentPage(totalPages - 1);
  }
};

  const handleDotClick = (page) => {
    setCurrentPage(page);
  };

  // Simplified animation variants
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const blogVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0 },
  };

  return (
    <section
      id="blog"
      className="relative min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden"
    >
      <div id="particles-blog" className="absolute inset-0 z-[-1]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300"
        >
          My Blog
        </motion.h2>
        <motion.p
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-6 text-gray-600 dark:text-gray-300 font-inter"
        >
          Thoughts, tutorials, and stories from my journey as a developer. Dive in!
        </motion.p>
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
        >
          {['All', 'Latest', 'Tech', 'Personal'].map((f, index) => (
            <motion.button
              key={f}
              custom={index}
              variants={childVariants}
              whileHover={{ scale: 1.1 }}
              onClick={() => debouncedSetFilter(f)}
              className={`px-4 py-2 rounded-full bg-white/30 dark:bg-gray-800/30 text-sm sm:text-base font-medium font-inter ${
                filter === f
                  ? 'text-white bg-gradient-to-r from-blue-500 to-teal-400'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentPage}-${filter}`}
              initial="enter"
              animate="center"
              exit="exit"
              variants={blogVariants}
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center"
            >
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={childVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative bg-white/30 dark:bg-gray-800/30 p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-80 transition-transform hover:scale-105"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <img
                      src={blog.image}
                      loading="lazy"
                      alt={blog.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm text-secondary">
                        {blog.category}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {blog.date}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredBlogs.length > blogsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <motion.button
                onClick={handlePrev}
                className="p-3 sm:p-4 rounded-full bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
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
                  ></motion.button>
                ))}
              </div>
              <motion.button
                onClick={handleNext}
                className="p-3

 sm:p-4 rounded-full bg-white/30 dark:bg-gray-800/30 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
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
  );
};

export default Blog;