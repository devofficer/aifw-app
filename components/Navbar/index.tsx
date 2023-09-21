import NavLinks from "@/common/NavLinks";

import styles from "./Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/">AIFW</Link>
      </div>
      <div className={styles.links}>
        <NavLinks />
      </div>
    </div>
  );
};

export default Navbar;
