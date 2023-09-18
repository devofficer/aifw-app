'use client';

import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  handler: () => void;
}

const Button = ({text, handler}: ButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={handler}
    >
      {text}
    </button>
  )
}

export default Button;