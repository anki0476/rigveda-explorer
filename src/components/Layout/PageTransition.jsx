import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96], // Slightly smoother easing
        when: "beforeChildren"
      }}
      style={{
        width: '100%',
        minHeight: '100vh'
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
