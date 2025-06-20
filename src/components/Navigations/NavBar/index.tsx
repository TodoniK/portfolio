'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';
import Home from '@/resources/svgs/nav-icons/home.svg';
import Jobs from '@/resources/svgs/nav-icons/experiences.svg';
import Projects from '@/resources/svgs/nav-icons/projects.svg';
import Educations from '@/resources/svgs/nav-icons/education.svg';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const navbarRef = useRef<HTMLElement>(null);
    const navItemsRef = useRef<Record<string, React.RefObject<HTMLLIElement>>>({
        home: useRef(null),
        jobs: useRef(null),
        educations: useRef(null),
        projects: useRef(null)
    });

    const updateActiveIndicator = useCallback((section: string): void => {
        const activeNavItem = navItemsRef.current[section]?.current;
        if (activeNavItem && navbarRef.current) {
            const {offsetTop, offsetHeight} = activeNavItem;
            navbarRef.current.style.setProperty('--active-top', `${offsetTop}px`);
            navbarRef.current.style.setProperty('--active-height', `${offsetHeight}px`);
        }
    }, []);

    const handleNavClick = useCallback((sectionId: string): void => {
        setActiveSection(sectionId);
        updateActiveIndicator(sectionId);
    }, [updateActiveIndicator]);

    useEffect(() => {
        const handleScroll = debounce((): void => {
            const sections = ['home', 'jobs', 'educations', 'projects'];
            let currentSection = 'home';

            for (const section of sections) {
                const sectionElement = document.getElementById(section);
                if (sectionElement) {
                    const bounds = sectionElement.getBoundingClientRect();
                    const threshold = window.innerHeight * 0.2;
                    if (bounds.top < threshold && bounds.bottom > threshold) {
                        currentSection = section;
                        break;
                    }
                }
            }

            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
                updateActiveIndicator(currentSection);
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection, updateActiveIndicator]);

    const renderNavItem = (id: string, Icon: string, label: string) => (
        <li ref={navItemsRef.current[id]} key={id}>
            <a href={`#${id}`} onClick={() => handleNavClick(id)}
               className={activeSection === id ? styles.active : ''}>
                <span className={styles.icon}>
                    <Image 
                        src={Icon} 
                        alt={label}
                        priority={id === 'home'}
                    />
                </span>
            </a>
        </li>
    );

    return (
        <nav className={styles.navbar} ref={navbarRef}>
            <ul>
                {renderNavItem('home', Home, 'Home')}
                {renderNavItem('jobs', Jobs, 'Jobs')}
                {renderNavItem('educations', Educations, 'Educations')}
                {renderNavItem('projects', Projects, 'Projects')}
            </ul>
        </nav>
    );
};

export default Navbar;
