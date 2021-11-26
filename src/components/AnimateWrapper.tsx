import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimateWrapperProps = {
  children: ReactNode;
};

// Provide basic animation on route change
const AnimateWrapper = ({ children }: AnimateWrapperProps) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {children}
  </motion.div>
);

export default AnimateWrapper;
