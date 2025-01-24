import Container from '@/components/Cards/Container';
import Job from '@/components/Cards/Job';
import ContainerStyles from '@/components/Cards/Container/container.module.scss';
import styles from './jobs.module.scss';
import getAllJobs from '@/lib/jobs';

export default function Jobs() {
    const jobs = getAllJobs();

    return (
        <Container id={'jobs'} className={'jobs'}>
            <div className={ContainerStyles.title}>
                <h2>
                    Jobs
                </h2>
                <hr />
            </div>
            <div className={styles['jobs-list']}>
                {
                    jobs.map((job, index) => (
                        <Job key={index} job={job} />
                    ))
                }
            </div>
        </Container>
    );
}