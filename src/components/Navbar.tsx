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
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/BlueberryTartLogo.png"
                alt="Vercel Logo"
                
                width={50}
                height={50}
                priority
              />
            </a>
          </div>
    </main>
      
    
  );
};
export default Navbar;
