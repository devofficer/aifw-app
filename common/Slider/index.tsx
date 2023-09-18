import clxs from "classnames";
import { Tooltip } from "react-tooltip";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import styles from "./Slider.module.css";

interface SliderProps {
  name: string;
  label: string;
  tooltip?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>((
  { name, label, tooltip },
  ref
) => {
  const [cfg, setCfg] = useState(7);
  const thumbTipRef = useRef<HTMLSpanElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCfg(parseInt(e.target.value));
  }

  useEffect(() => {
    if(thumbTipRef.current) {
      const width = thumbTipRef.current.clientWidth;
      const percent = (cfg - 1) / 29;
      const delta = 40.34 * (1 - percent) - (width / 2);
      thumbTipRef.current.style.left = `calc(${percent * 100}% + ${delta}px)`;
    }
  }, [cfg])

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {label}
        {tooltip &&
          <span id={`${name}-tooltip`} className={styles.cfg}>
            <QuestionMarkCircleIcon className={styles.icon} />
          </span>
        }
      </p>
      {
        tooltip && <Tooltip anchorSelect={`#${name}-tooltip`}>
          <div className={styles.tooltip}>{tooltip}</div>
        </Tooltip>
      }
      <input
        ref={ref}
        name={name}
        type="range"
        min="1"
        max="30"
        defaultValue={7}
        onChange={handleChange}
        className={clxs(styles.slider)}
      />
      <span ref={thumbTipRef} className={styles.thumbTip}>{cfg}</span>
    </div>
  )
})

export default Slider;