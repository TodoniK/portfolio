"use client";

import { motion } from 'framer-motion';
import Home from '@/components/Sections/Home';
import Jobs from '@/components/Sections/Jobs';
import Projects from '@/components/Sections/Projects';
import Educations from '@/components/Sections/Educations';
import Contacts from '@/components/Sections/Contacts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function Page() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={sectionVariants}>
        <Home />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Jobs />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Educations />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Projects />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Contacts />
      </motion.div>
    </motion.main>
  );
}
