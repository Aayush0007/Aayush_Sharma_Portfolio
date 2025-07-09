import Blog1 from "../assets/Blog1.png";
import Blog2 from "../assets/Blog2.png";
import Blog3 from "../assets/Blog3.png";

export const blogs = [
  {
    id: 1,
    title: "Building Scalable Web Apps with React and Node.js",
    date: "2025-06-15",
    category: "Tech",
    excerpt:
      "Exploring how to create high-performance web applications using React and Node.js, with tips on scalability and best practices.",
    content: `
React and Node.js form a powerful combo for building fast, modular, and maintainable web apps.

🔹 **Why React and Node.js?**
- React: Component-based architecture for reusable UI
- Node.js: Non-blocking I/O model for high concurrency and speed

🔹 **Key Steps in the Process**
1. Project Setup: Use Vite for React and Express for Node.js
2. API Design: Create RESTful APIs to manage and transfer data
3. State Management: Use Redux Toolkit or React Context for scalable state
4. Scalability: Implement load balancing and Redis caching
5. Deployment: Use Docker and AWS to ship with confidence

🔹 **Challenges Faced**
- Managing global state efficiently
- Writing proper error handling for Node.js APIs

🔹 **Conclusion**
React and Node.js enable developers to build high-performance, user-friendly applications. Up next? WebSocket optimization!
    `,
    image: Blog1,
    shareUrl: "https://aayush-sharma-portfolio-rho.vercel.app//blog/1",
    shareTitle: "Building Scalable Web Apps with React and Node.js",
  },
  {
    id: 2,
    title: "My Journey into Rust: Why It’s My New Favorite Language",
    date: "2025-05-20",
    category: "Tech",
    excerpt:
      "A personal take on learning Rust, its benefits for systems programming, and why it’s worth the steep learning curve.",
    content: `
Rust’s focus on safety and performance makes it ideal for systems programming.

🦀 **Why Rust?**
- Memory Safety: Ownership model prevents null or dangling pointers
- Performance: Comparable to C++ but safer and more expressive
- Community: Friendly, with great documentation like *The Rust Book*

🛠️ **My Experience**
I built a task manager CLI tool. Rust’s compiler helped me catch logic errors early, making me write cleaner code.

💡 **Tips for Beginners**
- Read *The Rust Book* from start to finish
- Start small: build CLI tools or mini-libraries
- Join the Rust Discord and ask questions

✅ **Conclusion**
Rust is now my go-to for building fast, reliable, and safe software. Stay tuned for more Rust-based projects!
    `,
    image: Blog2,
    shareUrl: "https://aayush-sharma-portfolio-rho.vercel.app//blog/2",
    shareTitle: "My Journey into Rust: Why It’s My New Favorite Language",
  },
  {
    id: 3,
    title: "Balancing Work and Life as a Developer",
    date: "2025-04-10",
    category: "Personal",
    excerpt:
      "Being a developer is rewarding but intense. Here’s how I maintain work-life balance with mindful strategies.",
    content: `
Being a developer is fulfilling, but it can easily take over your life. Here's how I balance it all.

⚖️ **My Approach**
- Time Blocking: I use Notion to split my day into deep work and personal time
- Short Breaks: Every 90 minutes, I take a walk or step away from the screen

😰 **Challenges**
Burnout is real, especially during deadlines. Learning to say *no* and protect personal time was essential.

💡 **Practical Tips**
- Use Pomodoro timers for better focus
- Schedule screen-free hours daily
- Talk to peers or mentors about your stress

🧘 **Conclusion**
Work-life balance isn’t a destination — it’s a habit. The key is to stay consistent and be kind to yourself.
    `,
    image: Blog3,
    shareUrl: "https://aayush-sharma-portfolio-rho.vercel.app//blog/3",
    shareTitle: "Balancing Work and Life as a Developer",
  },
];
