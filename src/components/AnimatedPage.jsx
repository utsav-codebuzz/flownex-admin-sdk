import { motion } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
        transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
        }
    }
};

export default function AnimatedPage({ children }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
