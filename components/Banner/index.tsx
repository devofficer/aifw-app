import Image from "next/image";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Image
        alt="banner"
        src="/assets/banner.jpg"
        width={1031}
        height={413}
        className={styles.img}
      />
    </div>
  );
};

export default Banner;
