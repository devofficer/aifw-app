import React from "react";
import styles from "./TextField.module.css";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";

interface TextFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  defaultValue?: number | string;
  tooltip?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((
  { name, type, label, placeholder, defaultValue, tooltip }, 
  ref
) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {tooltip && 
          <span id={`${name}-tooltip`} className={styles.cfg}>
            <QuestionMarkCircleIcon className={styles.icon} />
          </span>
        }
      </label>
      {
        tooltip && <Tooltip anchorSelect={`#${name}-tooltip`}>
          <div className={styles.tooltip}>{tooltip}</div>
        </Tooltip>
      }
      <input 
        ref={ref}
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder}
        className={styles.input} 
        defaultValue={defaultValue}
      />
    </div>
  );
})

export default TextField;