// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const Navbar = () => {
  return (
      <main >
        <div className={styles.description}>
            <a
              href="https://github.com/Thirstums/platify/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/PlatifyLogo.png"
                alt="Vercel Logo"
                
                width={50}
                height={50}
                priority
              /> Platify
            </a>
          </div>
    </main>
      
    
  );
};
export default Navbar;
