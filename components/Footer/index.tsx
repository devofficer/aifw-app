import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <Link href={"/rules"}>Rules</Link>
        <span>|</span>
        <Link href={"/faq"}>FAQ</Link>
      </div>
      <span className={styles.season}>AIFW Season 2</span>
    </footer>
  );
};

export default Footer;
