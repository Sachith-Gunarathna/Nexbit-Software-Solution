"use client";

import { motion } from 'framer-motion';

interface AnimationContainerProps {
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    className?: string;
};

const AnimationContainer = ({ children, className, reverse, delay }: AnimationContainerProps) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: reverse ? -10 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.2, delay: delay, ease: 'easeOut', type: 'tween', stiffness: 260, damping: 20 }}
        >
            {children}
        </motion.div>
    )
};

export default AnimationContainer