import React, {
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import ImageLoader from "@/common/ImageLoader";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import styles from "./LightBox.module.css";

interface LightBoxProps {
  url: string;
  handleClose: Dispatch<SetStateAction<string>>;
}

const LightBox = ({ url, handleClose }: LightBoxProps) => {
  const lightBoxRef = useRef<HTMLDivElement>(null);
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") handleClose("");
  };

  useEffect(() => {
    if (url !== "" && lightBoxRef.current) lightBoxRef.current.focus();
  }, [url]);

  return (
    <div
      tabIndex={0}
      ref={lightBoxRef}
      className={classNames(
        styles.container,
        url === "" ? styles.invisible : ""
      )}
      onClick={() => handleClose("")}
      onKeyUp={handleKeyUp}
    >
      <div className={styles.close} onClick={() => handleClose("")}>
        <XMarkIcon className={styles.icon} aria-hidden="true" />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {url !== "" && <ImageLoader url={url} idx={0} />}
      </div>
    </div>
  );
};

export default LightBox;
