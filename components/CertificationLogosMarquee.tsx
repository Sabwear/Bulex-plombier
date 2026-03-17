'use client';

import Image from 'next/image';
import styles from './CertificationLogosMarquee.module.css';

const LOGOS: { src: string; alt: string }[] = [
  { src: '/certification/professionnel-du-gaz-logo.svg', alt: 'Professionnel du Gaz' },
  { src: '/certification/qualigaz-1280x720-removebg-preview.png', alt: 'Qualigaz' },
  { src: '/certification/rge-qualibat-logo.svg', alt: 'RGE Qualibat' },
  { src: '/certification/rge-qualipac-logo.svg', alt: 'RGE QualiPAC' },
  { src: '/certification/rge-qualipv-logo.svg', alt: 'RGE QualiPV' },
  { src: '/certification/rge-chauffage-plus.png', alt: 'RGE Chauffage +' },
  { src: '/certification/RGE-Quali-BOIS.png', alt: 'RGE QualiBois' },
  { src: '/certification/PG-PAC-HYBRIDE-Photoroom.png', alt: 'PG PAC Hybride' },
];

export default function CertificationLogosMarquee() {
  return (
    <div className={styles.wrap} aria-label="Certification logos carousel">
      <div className={styles.track}>
        {[0, 1].map((group) => (
          <div
            // Two identical groups to ensure a seamless loop
            key={group}
            className={styles.group}
            aria-hidden={group === 1}
          >
            {LOGOS.map((logo) => (
              <div key={`${group}-${logo.src}`} className={styles.logoItem}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={80}
                  className={styles.logo}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

