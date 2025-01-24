'use client';

import React from 'react';
import styles from './certificate.module.scss';

type Certificate = {
  time: string;
  title: string;
  school: string;
  link: string;
  city: string;
  logo: string;
  description: string;
}

export default function Certificate({ certificate }: { certificate: Certificate }) {
  return (
    <a href={certificate.link} target="_blank" rel="noopener noreferrer">
      <div className={styles['certificate-card']}>
        <div className={styles['timeline-container']}>
          <span>{certificate.time}</span>
          <div className={styles['image-container']}>
            <img src={certificate.logo} alt="Company Logo" className={styles.logo} />
          </div>
        </div>
        <div className={styles['info-container']}>
          <div className={styles['title']}>
            <h3>{certificate.title}</h3>
          </div>
          <div className={styles['description']}>
            {certificate.description}
          </div>
        </div>
      </div>
    </a>
  );
}
