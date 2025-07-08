import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { blogs } from '../utils/data';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Blog not found!
        </p>
      </div>
    );
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(blog.shareUrl)}&text=${encodeURIComponent(blog.shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blog.shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blog.shareUrl)}`,
  };

  return (
    <section className="min-h-screen py-20 sm:py-24 bg-gradient-radial from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate('/#blog')}
          className="mb-6 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <FaArrowLeft size={20} />
          Back to Blog
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/30 dark:bg-gray-800/30 p-6 sm:p-8 rounded-lg shadow-lg"
        >
          <img
            src={blog.image}
            loading="lazy"
            alt={blog.title}
            className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-800 dark:text-gray-200 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-secondary">{blog.category}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {blog.date}
            </span>
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 font-inter">
            {blog.content.split('\n').map((line, index) => (
              <p key={index} className="mb-4">{line}</p>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-secondary font-inter text-sm"
              title="Share on Twitter"
            >
              <FaTwitter size={20} />
              Twitter
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap Arun-2 text-blue-500 hover:text-secondary font-inter text-sm"
              title="Share on LinkedIn"
            >
              <FaLinkedin size={20} />
              LinkedIn
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-secondary font-inter text-sm"
              title="Share on Facebook"
            >
              <FaFacebook size={20} />
              Facebook
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;