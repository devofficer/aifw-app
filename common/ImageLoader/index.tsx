import Image from "next/image";
import classNames from "classnames";
import styles from "./ImageLoader.module.css";
import { useEffect, useState } from "react";

interface ImageLoaderProps {
  url: string;
  idx: number;
}

const ImageLoader = ({url, idx}: ImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [url])
  return (
    <div className={styles.container}>
      <div className={classNames(styles.loader, loaded ? styles.hidden : '')}></div>
      <Image
        src={url}
        alt={`Generated ${idx}`}
        width={640}
        height={640}
        quality={100}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default ImageLoader;