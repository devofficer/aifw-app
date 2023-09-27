import styles from "./Navbar.module.css";

import Marquee from "react-fast-marquee";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Marquee>
        ROLLING ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR | ROLLING
        ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR |
        ROLLING ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR | ROLLING
        ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR | ROLLING ANNOUNCEMENT BAR
      </Marquee>
      {/* <div>
        <Link href="/">AIFW</Link>
      </div>
      <div className={styles.links}>
        <NavLinks />
      </div> */}
    </div>
  );
};

export default Navbar;
