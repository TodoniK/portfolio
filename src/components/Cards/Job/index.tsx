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
        Scrum: '#f1e05a'
    };

    return (
        <a href={job.link} target="_blank" rel="noopener noreferrer">
            <div className={styles['job-card']}>
                <div className={styles['timeline-container']}>
                    <span>{job.time}</span>
                    <div className={styles['image-container']}>
                        <img src={job.logo} alt="Company Logo" className={styles.logo} />
                    </div>
                </div>
                <div className={styles['info-container']}>
                    <div className={styles['title']}>
                        <h3>{job.title}</h3>
                    </div>
                    <div className={styles['description']}>
                        {job.description}
                    </div>
                    <div className={styles['specifities']}>
                        {job.specifities.map((specifity, index) => (
                            <span key={specifity}>
                                <div className={styles['color-circle']}
                                    style={{ backgroundColor: specifitiesColors[specifity] || 'yellow' }}></div>
                                <span>{specifity}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
}