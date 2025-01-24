import Container from '@/components/Cards/Container';
import ContainerStyles from '@/components/Cards/Container/container.module.scss';
import Project from '@/components/Cards/Project';
import getAllProjects from '@/lib/projects';

export default function Projects() {

    const projects = getAllProjects();

    return (
        <Container id={'projects'} className={'projects'}>
            <div className={ContainerStyles.title}>
                <h2>
                    Projects
                </h2>
                <hr />
            </div>
            <div>
                {
                    projects.map(project => (
                        <Project key={project.id} project={project} />
                    ))
                }
            </div>
        </Container>
    );
}