import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Testimonials from './components/Testimonials';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Projects />
                  <Blog />
                  <Testimonials />
                  <Contact />
                </>
              }
            />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <Chatbot theme={theme} />
    </div>
  );
}

export default App;