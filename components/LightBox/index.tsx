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
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./LightBox.module.css";

interface LightBoxProps {
  urls: string[];
  handleClose: Dispatch<SetStateAction<string[]>>;
}

const LightBox = ({ urls, handleClose }: LightBoxProps) => {
  const lightBoxRef = useRef<HTMLDivElement>(null);
  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") handleClose([]);
  };

  useEffect(() => {
    if (urls.length > 0 && lightBoxRef.current) lightBoxRef.current.focus();
  }, [urls]);

  return (
    <div
      tabIndex={0}
      ref={lightBoxRef}
      className={classNames(
        styles.container,
        urls.length === 0 ? styles.invisible : ""
      )}
      onClick={() => handleClose([])}
      onKeyUp={handleKeyUp}
    >
      <div className={styles.close} onClick={() => handleClose([])}>
        <XMarkIcon className={styles.icon} aria-hidden="true" />
      </div>
      <div
        className={styles.swiperWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          className={styles.swiper}
          modules={[EffectFade, Navigation, Pagination]}
          effect={"fade"}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {urls.map((url, idx) => {
            return (
              <SwiperSlide key={idx}>
                <ImageLoader url={url} idx={idx} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default LightBox;
