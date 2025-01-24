import Container from '@/components/Cards/Container';
import ContainerStyles from '@/components/Cards/Container/container.module.scss';
import styles from './educations.module.scss';
import getAllCertificates from '@/lib/certificates';
import Certificate from '@/components/Cards/Certificate';

export default function Educations() {
    const certificates = getAllCertificates();

    return (
        <Container id={'educations'} className={'educations'}>
            <div className={ContainerStyles.title}>
                <h2>
                    Education
                </h2>
                <hr />
            </div>
            <div className={styles['educations-list']}>
                {
                    certificates.map((certificate, index) => (
                        <Certificate key={index} certificate={certificate} />
                    ))
                }
            </div>
        </Container>
    );
}