import NavLinks from "@/common/NavLinks";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLinks />
      </div>
    </div>
  );
};

export default Navbar;
