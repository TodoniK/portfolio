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
                Cloud & DevOps Architect.
            </div>
        </div>
        <div className={styles.contacts}>
          <a href="/assets/resume/resumes.pdf" target="_blank"
             className={styles['resume-button']}>
            <Image src={Resume} alt={'Resume'} className={styles.icon} priority/>
            <div className={styles.label}>Resume</div>
          </a>
          <a href="https://www.linkedin.com/in/jules-royet" target="_blank"
             className={styles.links}>
            <Image src={LinkedIn} alt={'LinkedIn'} className={styles.icon} priority/>
            <div className={styles.label}>LinkedIn</div>
          </a>
          <a href="mailto:jules.royet.pc@gmail.com" className={styles.links}>
            <Image src={Mail} alt={'Mail'} className={styles.icon} priority/>
            <div className={styles.label}>Mail</div>
          </a>
          <a href="https://github.com/todonik" target="_blank" className={styles.links}>
            <Image src={GitHub} alt={'GitHub'} className={styles.icon} priority/>
            <div className={styles.label}>Github</div>
          </a>
          <a href="https://www.root-me.org/ROYET?lang=fr#6d64628f42c7d83514cfbbcf25d78e75" target="_blank" className={styles.links}>
            <Image src={RootMe} alt={'RootMe'} className={styles.icon} priority/>
            <div className={styles.label}>Root-Me</div>
          </a>
        </div>
        <hr className={styles.divider}/>
        <div className={styles.summery}>
          <p>
            ✌️Hey! I&apos;m Jules, a <b>passionate Cloud & DevOps Architect</b> and recent graduate from <b>l&apos;ENSEIRB-MATMECA</b> with over <b>3 years of experience</b> in full-stack development and cloud infrastructure. I specialize in designing scalable <b>cloud architectures</b>, implementing robust <b>CI/CD pipelines</b>, and crafting efficient backend systems using <b>Java</b>, <b>Kotlin</b>, and frameworks like <b>Spring</b>. On the frontend, I build sleek, interactive interfaces with <b>Vue.js</b>, <b>React</b>, and <b>Node.js</b>, always ensuring seamless user experiences with cutting-edge <b>UI/UX designs</b>. ✨
          </p><br/>
          <p>
            🚀 I thrive on solving complex infrastructure challenges and delivering innovative cloud-native solutions, whether it&apos;s architecting scalable microservices, implementing Infrastructure as Code, or optimizing deployment strategies. Recently, I&apos;ve been diving deeper into <b>cybersecurity</b> 🛡️, exploring both offensive and defensive strategies, with a keen interest in <b>SOC operations</b> and <b>ethical hacking</b>.
          </p><br/>
          <p>
            💼 Currently working at <b>Orange</b> as a Cloud & DevOps Architect, I focus on designing resilient cloud infrastructures that bridge performance, security, and scalability, creating impactful digital transformations.
          </p><br/>
          <p>
            ☕ When I&apos;m not architecting cloud solutions, you&apos;ll find me exploring the latest DevOps trends 🌐, reading about cybersecurity 🔍, brainstorming the next infrastructure innovation 💡, or enjoying a good coffee while unwinding with a great book 📚.
          </p>
        </div>
      </div>
    </Container>
  );
}
