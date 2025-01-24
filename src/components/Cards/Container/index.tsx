import styles from './container.module.scss';

export default function Container({ id, className, children }: {
    id: string,
    className: string,
    children: React.ReactNode
}) {
    return (
        <section id={id} className={styles.container}>
            {children}
        </section>
    );
}