import styles from './footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Récupérer l'année en cours

  return (
    <footer className={styles['footer-container']}>
      <p>
        Built with <a href={'https://nextjs.org/'} target={'_blank'}>Next.js</a> and
        <a href={'https://nextjs.org/docs/app/building-your-application/styling/css-modules'}> SCSS Modules</a>,
        deployed using <a href={'https://vercel.com/'} target={'_blank'}>Vercel</a>
      </p>
      <p>
        &copy; {currentYear} Jules Royet. All rights reserved.
      </p>
    </footer>
  );
}
