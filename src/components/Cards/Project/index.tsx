import styles from './project.module.scss';
import Image from 'next/image';
import PrivateIcon from '@/resources/svgs/project-icons/private.svg';
import CodeIcon from '@/resources/svgs/project-icons/code.svg';
import PreviewIcon from '@/resources/svgs/project-icons/preview.svg';

type Tag = {
    name: string;
    url: string;
};

type Project = {
    id: number;
    private: boolean;
    name: string;
    description: string;
    repository: string;
    preview: string;
    thumbnail: string;
    tags: Tag[];
};

export default function Project({ project }: { project: Project }) {
    return (
      <div
        className={`${styles['project-card']} ${project.private ? styles['private-card'] : ''}`}
      >
          <div className={styles['img-container']}>
              <img src={project.thumbnail} alt={'Sample Image'} />
              {project.private && (
                <div className={styles['private-overlay']}>
                    <Image src={PrivateIcon} alt="Private Icon" />
                </div>
              )}
              {!project.private && (
                <div className={styles['buttons']}>
                    <a href={project.repository} target="_blank" className={styles['button']}>
                        <Image src={CodeIcon} alt="Code Icon" />
                    </a>
                    <a href={project.preview} target="_blank" className={styles['button']}>
                        <Image src={PreviewIcon} alt="Preview Icon" />
                    </a>
                </div>
              )}
          </div>
          <div className={styles['info-container']}>
              <div className={styles['name']}>
                  <h3>{project.name}</h3>
              </div>
              <div className={styles['description']}>
                  <p>{project.description}</p>
              </div>
              <div className={styles['tags']}>
                  {project.tags.map((tag, index) => (
                    <span key={index}>
                            <img src={tag.url} alt={tag.name} style={{ height: '20px', margin: '0 5px' }} />
                        </span>
                  ))}
              </div>
          </div>
      </div>
    );
}
