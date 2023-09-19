"use client";

import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  size?: "sm" | "md";
  variant?: "success" | "danger" | "normal";
  handler: () => void;
}

const Button = ({
  text,
  handler,
  size = "md",
  variant = "normal",
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(styles.button, styles[size], styles[variant])}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default Button;
