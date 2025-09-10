import Image from 'next/image';
import styles from './job.module.scss';

type Job = {
    time: string;
    title: string;
    description: string;
    logo: string;
    link: string
    specifities: string[];
}

export default function Job({ job }: { job: Job }) {

    const specifitiesColors: { [key: string]: string } = {
        Jira: '#563d7c',
        Confluence: '#c6538c',
        Agile: '#89e051',
        "V-Cycle": '#4eaa25',
        Scrum: '#f1e05a',
        "Cloud Architecture": '#FF9900', // Orange AWS-style
        "DevOps": '#326CE5', // Bleu Kubernetes
        "CI/CD": '#FF6B6B', // Rouge moderne pour pipelines
        "Infrastructure as Code": '#7B68EE', // Violet pour IaC
        "Full-Stack Development": '#20B2AA' // Bleu-vert pour full-stack
    };

    return (
        <a href={job.link} target="_blank" rel="noopener noreferrer">
            <article 
              className={styles['job-card']}
              itemScope
              itemType="https://schema.org/WorkExperience"
            >
                <div className={styles['timeline-container']}>
                    <time itemProp="datePublished">{job.time}</time>
                    <div className={styles['image-container']}>
                        <Image 
                          src={job.logo} 
                          alt={`Logo de l'entreprise ${job.title.split(' - ')[1] || 'Entreprise'}`}
                          className={styles.logo}
                          loading="lazy"
                          width={55}
                          height={55}
                        />
                    </div>
                </div>
                <div className={styles['info-container']}>
                    <div className={styles['title']}>
                        <h3 itemProp="jobTitle">{job.title}</h3>
                    </div>
                    <div className={styles['description']} itemProp="description">
                        {job.description}
                    </div>
                    <div className={styles['specifities']} itemProp="skills">
                        {job.specifities.map((specifity, index) => (
                            <div key={specifity} className={styles['specifity-item']}>
                                <div className={styles['color-circle']}
                                    style={{ backgroundColor: specifitiesColors[specifity] || 'yellow' }}></div>
                                <span>{specifity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </a>
    );
}