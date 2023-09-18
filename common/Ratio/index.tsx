import { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames";
import styles from "./Ratio.module.css";

interface RatioProps {
  activeIdx: number;
  setActiveIdx: Dispatch<SetStateAction<number>>;
}

const Ratio = ({activeIdx, setActiveIdx}: RatioProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Aspect Ratio</label>
      <div className={styles.wrapper}>
        <span 
          className={classNames(styles.item, activeIdx === 0 ? styles.active : "")}
          onClick={() => setActiveIdx(0)}
        >
          <span className={styles.itemWrapper}>
            <span className={styles.potrait}></span>
          </span>
          <span className={styles.itemLabel}>Vertical</span>
        </span>
        <span 
          className={classNames(styles.item, activeIdx === 1 ? styles.active : "")}
          onClick={() => setActiveIdx(1)}
        >
          <span className={styles.itemWrapper}>
            <span className={styles.square}></span>
          </span>
          <span className={styles.itemLabel}>Square</span>
        </span>
        <span 
          className={classNames(styles.item, activeIdx === 2 ? styles.active : "")}
          onClick={() => setActiveIdx(2)}
        >
          <span className={styles.itemWrapper}>
            <span className={styles.landscape}></span>
          </span>
          <span className={styles.itemLabel}>Horizontal</span>
        </span>
      </div>
    </div>
  )
}

export default Ratio;