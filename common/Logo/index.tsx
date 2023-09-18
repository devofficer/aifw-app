import Image from "next/image"
import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link className={styles.logo} href="/">
      <Image src="/assets/logo.png" alt="logo" width={177} height={109} />
    </Link>
  )
}

export default Logo;