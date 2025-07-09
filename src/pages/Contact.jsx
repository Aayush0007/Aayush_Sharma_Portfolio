import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Social media links configuration
const socialLinks = [
  {
    href: "https://linkedin.com/in/aayush-sharma0477502a1",
    icon: FaLinkedinIn,
    label: "LinkedIn",
  },
  { href: "https://github.com/Aayush0007", icon: FaGithub, label: "GitHub" },
  { href: "https://x.com/AayushShar001", icon: FaTwitter, label: "Twitter" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[<>{}]/g, "");
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // Form validation
  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length > 50)
      newErrors.name = "Name must be 50 characters or less";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length > 200)
      newErrors.message = "Message must be 200 characters or less";
    return newErrors;
  }, [formData]);

  // Form submission handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setIsSubmitting(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        });
        const url = `https://script.google.com/macros/s/AKfycbx8k291dhzQGV92ot1YSaSJPnRD_AOG_-QqrQZsVysCVQUA1C3C1IuRHKT1RbzfDhk/exec?${params.toString()}`;
        
        await fetch(url, {
          method: "GET",
          mode: "no-cors",
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(timeoutId);
        
        toast.success(
          <div className="flex items-center">
            <FaCheckCircle className="mr-2" /> Message submitted!
          </div>,
          {
            className:
              "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg rounded-lg",
          }
        );
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        const errorMessage =
          error.name === "AbortError"
            ? "Request timed out"
            : error.message || "Network error. Please try again.";
        toast.error(
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2" /> Failed to submit: {errorMessage}
          </div>,
          {
            className: "bg-red-500 text-white shadow-lg rounded-lg",
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
      transition: { duration: 0.3 },
    },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.3 } },
  };

  const labelVariants = {
    inactive: { y: 0, opacity: 0.7, fontSize: "1rem" },
    active: {
      y: -24,
      opacity: 1,
      fontSize: "0.75rem",
      color: "#3b82f6",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300 shadow-lg"
        >
          Let's Connect
        </motion.h2>
        <motion.p
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm sm:text-base text-center max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300 font-inter"
        >
          Drop me a message or connect with me on social media. I'm excited to
          hear from you!
        </motion.p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
        >
          <motion.div
            variants={childVariants}
            className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Send a Message
            </h3>
            <div className="space-y-6">
              <div className="relative">
                <motion.label
                  htmlFor="name"
                  className="absolute left-3 top-3 text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none"
                  variants={labelVariants}
                  animate={formData.name ? "active" : "inactive"}
                >
                  Your Name
                </motion.label>
                <motion.input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 pt-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=""
                  whileFocus="focus"
                  variants={inputVariants}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  maxLength={50}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative">
                <motion.label
                  htmlFor="email"
                  className="absolute left-3 top-3 text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none"
                  variants={labelVariants}
                  animate={formData.email ? "active" : "inactive"}
                >
                  Your Email
                </motion.label>
                <motion.input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pt-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=""
                  whileFocus="focus"
                  variants={inputVariants}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  maxLength={100}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="relative">
                <motion.label
                  htmlFor="message"
                  className="absolute left-3 top-3 text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none"
                  variants={labelVariants}
                  animate={formData.message ? "active" : "inactive"}
                >
                  Your Message
                </motion.label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 pt-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={5}
                  placeholder=""
                  whileFocus="focus"
                  variants={inputVariants}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  maxLength={200}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg hover:shadow-2xl backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                animate={
                  isSubmitting
                    ? { scale: 1 }
                    : {
                        scale: [1, 1.05, 1],
                        transition: { duration: 2, repeat: Infinity },
                      }
                }
                aria-live="polite"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
                <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 origin-center"></span>
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            variants={childVariants}
            className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Get in Touch
              </h3>
              <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Email:{" "}
                <a
                  href="mailto:sharmaaayush2310@gmail.com"
                  className="text-blue-500 hover:text-teal-400 transition-colors duration-200"
                  aria-label="Email Aayush Sharma"
                >
                  sharmaaayush2310@gmail.com
                </a>
              </p>
              <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Phone:{" "}
                <a
                  href="tel:+919351044351"
                  className="text-blue-500 hover:text-teal-400 transition-colors duration-200"
                  aria-label="Call Aayush Sharma"
                >
                  +91 93510 44351
                </a>
              </p>
              <div className="flex space-x-4 sm:space-x-6 mb-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-200 to-teal-200 dark:from-blue-700 dark:to-teal-700 flex items-center justify-center group"
                    aria-label={`Visit ${link.label} profile`}
                  >
                    <link.icon
                      size={24}
                      className="text-gray-800 dark:text-gray-200 group-hover:text-white"
                    />
                    <span className="absolute inset-0 bg-blue-500/50 scale-0 group-hover:scale-150 rounded-full transition-transform duration-300"></span>
                  </motion.a>
                ))}
              </div>
            </div>
            <motion.a
              href="/Aayush Sharma - Resume.pdf"
              download
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full shadow-lg hover:shadow-2xl backdrop-blur-sm hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 text-center"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label="Download resume"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          className="z-50"
        />
      </div>
      <svg
        className="absolute bottom-0 w-full h-16 sm:h-20 text-blue-50 dark:text-blue-950"
        viewBox="0 0 1440 100"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C360,50 1080,150 1440,100 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
};

export default Contact;
