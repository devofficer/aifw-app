import { Dispatch, SetStateAction, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper';
import Image from 'next/image';
import classNames from 'classnames';
import Loading from '@/common/Loading';

import styles from "./ImageViewer.module.css";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImageLoader from '../ImageLoader';

interface ImageViewerProps {
  imageUrls: string[],
  isLoading?: boolean,
  handleSelect: Dispatch<SetStateAction<string>>;
}

const ImageViewer = ({ imageUrls, isLoading, handleSelect }: ImageViewerProps) => {
  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      <div className={classNames(styles.wrapper, isLoading ? styles.blur : '')}>
        {imageUrls?.length === 0 ?
          <>
            <p className={styles.helpText}>Type a prompt and hit Create to start!</p>
            <p className={styles.helpText}>Click/tap here to add an image to use as a reference!</p>
          </> :
          <div className={styles.layout}>
            {imageUrls.map((url, idx) => {
              return <div key={idx} onClick={() => handleSelect(imageUrls[idx])}>
                <ImageLoader url={url} idx={idx} />
              </div>;
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default ImageViewer;