// Loader.jsx
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      {/* Animated Rings */}
      <div className="relative w-24 h-24">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{
              scale: [0.5, 1.5],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icon */}
      <motion.div
        className="mt-8 text-4xl"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        📝
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="mt-4 text-lg tracking-wide"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading your todos...
      </motion.p>
    </div>
  );
}
