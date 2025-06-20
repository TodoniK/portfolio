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
      <article
        className={`${styles['project-card']} ${project.private ? styles['private-card'] : ''}`}
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
          <div className={styles['img-container']}>
              <Image 
                src={project.thumbnail} 
                alt={`Capture d'écran du projet ${project.name}`}
                className=""
                loading="lazy"
                width={300}
                height={169}
              />
              {project.private && (
                <div className={styles['private-overlay']} aria-label="Projet privé">
                    <Image src={PrivateIcon} alt="Icône projet privé" />
                </div>
              )}
              {!project.private && (
                <div className={styles['buttons']}>
                    <a 
                      href={project.repository} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles['button']}
                      aria-label={`Voir le code source de ${project.name} sur GitHub`}
                      itemProp="codeRepository"
                    >
                        <Image src={CodeIcon} alt="Icône code source" />
                    </a>
                    <a 
                      href={project.preview} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles['button']}
                      aria-label={`Voir la démo de ${project.name}`}
                      itemProp="url"
                    >
                        <Image src={PreviewIcon} alt="Icône aperçu" />
                    </a>
                </div>
              )}
          </div>
          <div className={styles['info-container']}>
              <div className={styles['name']}>
                  <h3 itemProp="name">{project.name}</h3>
              </div>
              <div className={styles['description']}>
                  <p itemProp="description">{project.description}</p>
              </div>
              <div className={styles['tags']} itemProp="programmingLanguage">
                  {project.tags.map((tag, index) => (
                    <span key={index} title={`Technologie: ${tag.name}`}>
                            <Image 
                              src={tag.url} 
                              alt={`Badge ${tag.name}`} 
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ height: '20px', width: 'auto', margin: '0 2px' }}
                              loading="lazy"
                            />
                        </span>
                  ))}
              </div>
          </div>
      </article>
    );
}
