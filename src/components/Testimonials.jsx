import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  useEffect(() => {
    // Only initialize particlesJS on desktop devices
    const isMobile = window.innerWidth < 640;
    if (!isMobile) {
      window.particlesJS('particles-testimonials', {
        particles: {
          number: { value: 30, density: { enable: true, value_area: 1500 } },
          color: { value: ['#3b82f6', '#10b981', '#8b5cf6'] },
          shape: { type: 'circle' },
          opacity: { value: 0.3, random: true },
          size: { value: 2, random: true },
          move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false },
        },
        interactivity: { detectOn: 'canvas', events: { resize: true } },
        retinaDetect: true,
      });
    }

    return () => {
      // Robust cleanup for particlesJS
      if (window.pJSDom?.[0]?.pJS) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
      const el = document.getElementById('particles-testimonials');
      if (el) el.innerHTML = '';
    };
  }, []);

  const testimonials = [
    {
      name: 'Saurabh Pradhan',
      title: 'Engineering Manager at Microsoft',
      linkedin: 'https://www.linkedin.com/in/saurabh-p-91b7881b/',
      photo: 'https://media.licdn.com/dms/image/v2/D5603AQEqnsoBo8zokw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723024607780?e=1757548800&v=beta&t=Ho5yV5Pk7tifzSdyl6TQwwbOeR0Doq3nsRJYowL-lYw',
      text: 'I got to work with Aayush on a bunch of greenfield projects and GenAI solutions. He possesses great technical skillset has a strong flair of execution. You can trust him with high standards of discipline, work ethic and capability to build from scratch. It was great working with you Aayush, will look up to you for anything requiring flawless execution in future. All the best.',
      date: 'April 30, 2025',
    },
    {
      name: 'Nidhi Sharma',
      title: 'Digital Marketing Consultant',
      linkedin: 'https://www.linkedin.com/in/nidhisharma2089/',
      photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHtJNsBxZwU_A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686638183137?e=1757548800&v=beta&t=ZTCm3fd1CfxMfA0Cg7YwK-pQMpA0HK3n-xNYT3d7ITw',
      text: 'Aayush is a phenomenal developer with a knack for turning complex problems into elegant solutions. His collaborative spirit and attention to detail made our cross-functional projects a success. Highly recommend working with him!',
      date: 'May 15, 2025',
    },
  ];

  // Simplified animation variants
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="testimonials"
      className="relative min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden"
    >
      <div id="particles-testimonials" className="absolute inset-0 z-[-1]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300"
        >
          What People Say
        </motion.h2>
        <motion.p
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300 font-inter"
        >
          Here’s what my colleagues and collaborators think about working with me!
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={childVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-white/30 dark:bg-gray-800/30 p-4 sm:p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.photo}
                  loading="lazy"
                  alt={`${testimonial.name}'s profile`}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.date}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                {testimonial.text}
              </p>
              <a
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-secondary text-sm"
              >
                View on LinkedIn
              </a>
            </motion.div>
          ))}
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

export default Testimonials;