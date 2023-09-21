import Image from "next/image";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Image
        alt="banner"
        src="/assets/bg.png"
        width={920}
        height={1080}
        className={styles.img}
      />
    </div>
  );
};

export default Banner;
