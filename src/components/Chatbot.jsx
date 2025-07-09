import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaStar } from 'react-icons/fa';
import knowledgeBase from '../data/knowledge-base.json';

const Chatbot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "🚀 Hey there! I'm Aayush's AI sidekick, ready to dive into his tech world! Ask me about his projects, skills, or try a challenge to earn Knowledge Points! Try: 'Show projects' or 'Fun fact'", buttons: ['Show projects', 'Fun fact', 'Contact Aayush'] }
  ]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [points, setPoints] = useState(0);
  const [topicsExplored, setTopicsExplored] = useState(new Set());
  const [typing, setTyping] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [speechMessage, setSpeechMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Randomize speech bubble message on mount
  useEffect(() => {
    const messages = ['Hey, let\'s chat! 🚀', 'Ask me anything! 🤖', 'Explore with me! 🌟'];
    setSpeechMessage(messages[Math.floor(Math.random() * messages.length)]);
    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: 'user', text: input }]);
    setTyping(true);
    setTimeout(() => {
      const response = processQuery(input);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.text, buttons: response.buttons }]);
      setTyping(false);
      setFeedback(null);
      updatePoints(response.topic);
    }, 1000);
    setInput('');
  };

  const handleButtonClick = (buttonText) => {
    setMessages([...messages, { sender: 'user', text: buttonText }]);
    setTyping(true);
    setTimeout(() => {
      const response = processQuery(buttonText);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.text, buttons: response.buttons }]);
      setTyping(false);
      setFeedback(null);
      updatePoints(response.topic);
    }, 1000);
  };

  const updatePoints = (topic) => {
    if (topic && !topicsExplored.has(topic)) {
      setTopicsExplored((prev) => new Set(prev).add(topic));
      setPoints((prev) => prev + 10);
      if (topicsExplored.size + 1 === 3) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: "🎉 Wow, you're a true explorer! Here's a fun fact: " + getRandomFunFact(), buttons: ['More fun facts', 'Show projects'] }
        ]);
      }
    }
  };

  const getRandomFunFact = () => {
    const facts = knowledgeBase.general.funFacts;
    return facts[Math.floor(Math.random() * facts.length)];
  };

  const processQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    let response = {
      text: "🤔 Hmm, I'm not sure about that. Want to contact Aayush directly? <a href='/contact' class='text-blue-500 dark:text-teal-300 underline'>Contact Me</a>",
      buttons: ['Show projects', 'Fun fact'],
      topic: null
    };

    const allEntries = [
      ...knowledgeBase.projects.map((p) => ({ ...p, type: 'project' })),
      ...knowledgeBase.experience.map((e) => ({ ...e, type: 'experience' })),
      ...knowledgeBase.blogs.map((b) => ({ ...b, type: 'blog' })),
      ...knowledgeBase.faqs.map((f) => ({ ...f, type: 'faq' })),
      { ...knowledgeBase.general, type: 'general' }
    ];

    for (const entry of allEntries) {
      const keywords = entry.keywords || [];
      if (keywords.some((kw) => lowerQuery.includes(kw.toLowerCase())) || lowerQuery.includes(entry.title?.toLowerCase())) {
        if (entry.type === 'project') {
          response = {
            text: `🌟 <strong>${entry.title}</strong>: When Aayush built this, he crafted ${entry.description.toLowerCase()} using ${entry.techStack.join(', ')}. ${
              entry.githubLink ? `<a href='${entry.githubLink}' class='text-blue-500 dark:text-teal-300 underline' target='_blank'>Check the code!</a>` : ''
            } ${entry.liveLink ? `<a href='${entry.liveLink}' class='text-blue-500 dark:text-teal-300 underline' target='_blank'>See it live!</a>` : ''} Want to explore more?`,
            buttons: ['Dive into Projects!', ...knowledgeBase.projects.filter((p) => p.title !== entry.title).map((p) => p.title), 'Fun fact'],
            topic: entry.title
          };
        } else if (entry.type === 'experience') {
          response = {
            text: `💼 <strong>${entry.title} (${entry.date})</strong>: Aayush made waves by ${entry.description.toLowerCase()}. Curious about his other adventures?`,
            buttons: ['Explore Experience', 'Contact Aayush', 'Fun fact'],
            topic: entry.title
          };
        } else if (entry.type === 'blog') {
          response = {
            text: `📝 <strong>${entry.title}</strong>: Aayush shared some wisdom on ${entry.excerpt.toLowerCase()} <a href='/blog/${entry.id}' class='text-blue-500 dark:text-teal-300 underline'>Read the full post!</a> Want more tech insights?`,
            buttons: ['Geek out on Blogs!', ...knowledgeBase.blogs.filter((b) => b.title !== entry.title).map((b) => b.title), 'Fun fact'],
            topic: entry.title
          };
        } else if (entry.type === 'faq') {
          response = {
            text: `❓ <strong>${entry.question}</strong>: ${entry.answer} Got more questions?`,
            buttons: ['More FAQs', 'Contact Aayush', 'Fun fact'],
            topic: entry.question
          };
        } else if (entry.type === 'general') {
          response = {
            text: `👨‍💻 Meet Aayush! ${entry.about} Ready to geek out on his work?`,
            buttons: ['Dive into Projects!', 'Explore Experience', 'Fun fact'],
            topic: 'about'
          };
        }
        break;
      }
    }

    if (lowerQuery.includes('projects') || lowerQuery.includes('show projects') || lowerQuery.includes('dive into projects')) {
      response = {
        text: "🎮 Aayush’s project gallery is epic! From FlowHive CRM to TheLoyalGame Chatbot, he’s built some cool stuff. Check them out or pick one to dive deeper! <a href='/projects' class='text-blue-500 dark:text-teal-300 underline'>View Projects</a>",
        buttons: knowledgeBase.projects.map((p) => p.title).concat(['Fun fact']),
        topic: 'projects'
      };
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('reach aayush')) {
      response = {
        text: "📬 Want to team up with Aayush? Reach him via the Contact section or email at aayush@example.com. <a href='/contact' class='text-blue-500 dark:text-teal-300 underline'>Send a Message!</a>",
        buttons: ['Learn about Aayush', 'Dive into Projects!', 'Fun fact'],
        topic: 'contact'
      };
    } else if (lowerQuery.includes('blogs') || lowerQuery.includes('geek out on blogs')) {
      response = {
        text: "🧠 Aayush’s blog is a treasure trove of tech and life hacks! From React to Rust to work-life balance, there’s something for everyone. <a href='/blog' class='text-blue-500 dark:text-teal-300 underline'>Start Reading!</a>",
        buttons: knowledgeBase.blogs.map((b) => b.title).concat(['Fun fact']),
        topic: 'blogs'
      };
    } else if (lowerQuery.includes('skills') || lowerQuery.includes('technologies')) {
      response = {
        text: "⚙️ Aayush’s tech arsenal includes React.js, Node.js, Rust, WebAssembly, Docker, PostgreSQL, MySQL, Spring Boot, Redis, and AWS. He’s a coding wizard! Want to see his work in action?",
        buttons: ['Dive into Projects!', 'Explore Experience', 'Fun fact'],
        topic: 'skills'
      };
    } else if (lowerQuery.includes('fun fact') || lowerQuery.includes('more fun facts')) {
      response = {
        text: `🎉 ${getRandomFunFact()} Want another?`,
        buttons: ['More fun facts', 'Dive into Projects!', 'Geek out on Blogs!'],
        topic: 'fun fact'
      };
    }

    return response;
  };

  const handleFeedback = (isHelpful) => {
    setFeedback(isHelpful ? '👍' : '👎');
    console.log(`Feedback: ${isHelpful ? 'Helpful' : 'Not Helpful'} for query: ${messages[messages.length - 2]?.text}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="relative"
        onMouseEnter={() => setShowSpeechBubble(true)}
        onMouseLeave={() => setShowSpeechBubble(false)}
      >
        <motion.button
          onClick={toggleChat}
          className="w-12 h-12 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1, rotate: 15 }}
          animate={{ scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' } }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {isOpen ? <FaTimes className="text-blue-500 dark:text-teal-300" size={20} /> : <FaRobot className="text-blue-500 dark:text-teal-300" size={20} />}
        </motion.button>
        <AnimatePresence>
          {!isOpen && showSpeechBubble && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute bottom-16 right-0 w-36 bg-gray-800 text-white rounded-lg shadow-md p-2 flex items-center text-xs whitespace-nowrap overflow-hidden"
            >
              <span>{speechMessage}</span>
              <svg className="absolute bottom-[-6px] right-4 w-4 h-4 fill-gray-800 transform rotate-45" viewBox="0 0 10 10">
                <path d="M0 0 L5 5 L10 0 Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-80 h-96 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl mt-2 flex flex-col border border-blue-200 dark:border-teal-700 max-w-[90vw] sm:w-80 sm:h-[70vh]"
          >
            <div className="p-4 border-b border-blue-200 dark:border-teal-700 flex items-center justify-between bg-gradient-to-r from-blue-100/50 to-teal-100/50 dark:from-blue-900/50 dark:to-teal-900/50">
              <div className="flex items-center gap-2">
                <FaRobot className="text-blue-500 dark:text-teal-300" size={20} />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Aayush's AI Sidekick</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" size={16} />
                <span className="text-sm text-gray-800 dark:text-gray-200">{points} Points</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {typing && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <span className="flex gap-1">
                      <span className="animate-pulse bg-gray-400 dark:bg-gray-600 h-2 w-2 rounded-full"></span>
                      <span className="animate-pulse bg-gray-400 dark:bg-gray-600 h-2 w-2 rounded-full animation-delay-200"></span>
                      <span className="animate-pulse bg-gray-400 dark:bg-gray-600 h-2 w-2 rounded-full animation-delay-400"></span>
                    </span>
                  </div>
                </motion.div>
              )}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-500/90 dark:bg-teal-300/90 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                    {msg.buttons && msg.buttons.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.buttons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleButtonClick(btn)}
                            className="px-2 py-1 text-sm bg-blue-500 dark:bg-teal-300 text-white rounded hover:bg-blue-600 dark:hover:bg-teal-400 transition-all"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.sender === 'bot' && index === messages.length - 1 && feedback === null && !typing && (
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => handleFeedback(true)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500">
                          👍
                        </button>
                        <button onClick={() => handleFeedback(false)} className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500">
                          👎
                        </button>
                      </div>
                    )}
                    {msg.sender === 'bot' && index === messages.length - 1 && feedback && (
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Thanks for the feedback! {feedback}</div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-blue-200 dark:border-teal-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-300"
                placeholder="Ask away or try a challenge! 🚀"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-full bg-blue-500 dark:bg-teal-300 text-white hover:bg-blue-600 dark:hover:bg-teal-400 transition-all"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;