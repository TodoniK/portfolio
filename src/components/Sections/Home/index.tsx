import Image from 'next/image';
import Container from '@/components/Cards/Container';
import Mail from '@/resources/svgs/contact-icons/mail.svg';
import GitHub from '@/resources/svgs/contact-icons/github.svg';
import RootMe from '@/resources/svgs/contact-icons/root-me.svg';
import Resume from '@/resources/svgs/contact-icons/resume.svg';
import LinkedIn from '@/resources/svgs/contact-icons/linkedin.svg';
import styles from './home.module.scss';

export default function Home() {
  return (
    <Container id={'home'} className={'home'}>
      <div className={styles['home-container']}>
        <div className={styles.status}>
          <div className={styles['status-circle']}></div>
          Online.
        </div>
        <div className={styles.introduction}>
            <span className={styles.wave}>👋</span> Hey, I&apos;m Jules
            <div className={styles.occupation}>
                Software Engineer.
            </div>
        </div>
        <div className={styles.contacts}>
          <a href="/resume/resumes.pdf" target="_blank"
             className={styles['resume-button']}>
            <Image src={Resume} alt={'Resume'} className={styles.icon}/>
            <div className={styles.label}>Resume</div>
          </a>
          <a href="https://www.linkedin.com/in/jules-royet" target="_blank"
             className={styles.links}>
            <Image src={LinkedIn} alt={'LinkedIn'} className={styles.icon}/>
            <div className={styles.label}>LinkedIn</div>
          </a>
          <a href="mailto:jules.royet.pc@gmail.com" className={styles.links}>
            <Image src={Mail} alt={'Mail'} className={styles.icon}/>
            <div className={styles.label}>Mail</div>
          </a>
          <a href="https://github.com/todonik" target="_blank" className={styles.links}>
            <Image src={GitHub} alt={'GitHub'} className={styles.icon}/>
            <div className={styles.label}>Github</div>
          </a>
          <a href="https://www.root-me.org/ROYET?lang=fr#6d64628f42c7d83514cfbbcf25d78e75" target="_blank" className={styles.links}>
            <Image src={RootMe} alt={'RootMe'} className={styles.icon}/>
            <div className={styles.label}>Root-Me</div>
          </a>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.summery}>
          <p>
            ✌️Hey! I&apos;m Jules, a <b>passionate and versatile developer</b> with over <b>3 years of experience</b> crafting robust backend systems using <b>Java</b> and <b>Kotlin</b> with frameworks like <b>Spring</b> and <b>Micronaut</b>. On the frontend, I specialize in building sleek, interactive, and user-friendly interfaces with <b>Vue.js</b> and <b>Node.js</b>, always ensuring a seamless user experience with cutting-edge <b>UI/UX designs</b>. ✨
          </p><br/>
          <p>
            🚀 I thrive on solving complex problems and delivering innovative solutions, whether it&apos;s building scalable APIs or designing modern, fancy web applications. Recently, I’ve been diving into the fascinating world of <b>cybersecurity</b> 🛡️, exploring both offensive and defensive strategies, with a keen interest in <b>SOC operations</b> and <b>ethical hacking</b>.
          </p><br/>
          <p>
            💼 Currently, I’m working on projects that bridge performance, design, and security, creating impactful digital experiences.
          </p><br/>
          <p>
            ☕ When I’m not coding, you’ll find me exploring the latest tech trends 🌐, reading about cybersecurity 🔍, brainstorming the next big idea 💡, or enjoying a good coffee while unwinding with a great book 📚.
          </p>
        </div>
      </div>
    </Container>
  );
}
