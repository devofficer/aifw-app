import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <Link href={"/policy"}>Privacy Policy</Link>
        <span>|</span>
        <Link href={"/terms"}>Terms & Conditions</Link>
        <span>|</span>
        <Link href={"/contact"}>Contact</Link>
      </div>
      <div className={styles.companies}>
        <div className={styles.company}>
          <span>Powered by</span>
          <img src="/assets/nvidia.png" alt="NVIDIA" />
        </div>
        <div className={styles.company}>
          <span>Created by</span>
          <img src="/assets/maison.png" alt="Maison Meta" />
        </div>
      </div>
    </footer>
  )
}

export default Footer;