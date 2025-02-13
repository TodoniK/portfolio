"use client";

import { motion } from 'framer-motion';
import Home from '@/components/Sections/Home';
import Jobs from '@/components/Sections/Jobs';
import Projects from '@/components/Sections/Projects';
import Educations from '@/components/Sections/Educations';
import Contacts from '@/components/Sections/Contacts';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  return (
    <main>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1.0 }}
      >
        <Home />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1.0 }}
      >
        <Jobs />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1.0 }}
      >
        <Educations />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1.0 }}
      >
        <Projects />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1.0 }}
      >
        <Contacts />
      </motion.div>
    </main>
  );
}
