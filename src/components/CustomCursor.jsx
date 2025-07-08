    import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        cursorRef.current.classList.add('cursor-hover')
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        cursorRef.current.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-8 h-8 bg-secondary rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    />
  )
}

export default CustomCursor