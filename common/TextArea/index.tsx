import React from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  placeholder?: string;
  label: string;
  name: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ placeholder, label, name}, ref) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className="mt-2">
        <textarea
          ref={ref}
          rows={4}
          name={name}
          id={name}
          className={styles.textarea}
          placeholder={placeholder}
          defaultValue={''}
        />
      </div>
    </div>
  )
})

export default TextArea;