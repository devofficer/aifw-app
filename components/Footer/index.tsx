import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <Link href={"https://fashionweek.ai/guidelines/"}>Rules</Link>
        <span>|</span>
        <Link href={"https://fashionweek.ai/faqs/"}>FAQ</Link>
      </div>
      <span className={styles.season}>AIFW Season 2</span>
    </footer>
  );
};

export default Footer;
