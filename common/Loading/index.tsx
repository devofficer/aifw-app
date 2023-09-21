import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.graybox}>
      <div className={styles.wrapper}>
        <span className={styles.loading}></span>
        <span className={styles.desc}>Loading</span>
      </div>
    </div>
  );
}
