import React from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}

export default Section;