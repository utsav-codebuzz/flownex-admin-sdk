import { ReactNode } from "react";
import { motion, cubicBezier } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.45,
            ease: cubicBezier(0.22, 1, 0.36, 1),
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
        transition: {
            duration: 0.35,
            ease: cubicBezier(0.22, 1, 0.36, 1),
        },
    },
};

export interface AnimatedPageProps {
    children: ReactNode;
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
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
