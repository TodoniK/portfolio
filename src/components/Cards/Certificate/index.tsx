'use client';

import React from 'react';
import Image from 'next/image';
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
            <Image 
              src={certificate.logo} 
              alt={`Logo de ${certificate.school}`}
              className={styles.logo}
              width={55}
              height={55}
              loading="lazy"
            />
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
