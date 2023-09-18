import Logo from "@/common/Logo";
import NavLinks from "@/common/NavLinks";

import styles from "./Navbar.module.css";

export const dynamic = "force-dynamic";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.links}>
        <NavLinks />
      </div>
    </div>
  )
}

export default Navbar;