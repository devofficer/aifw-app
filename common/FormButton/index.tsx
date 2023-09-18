'use client';

import styles from "./FormButton.module.css";

interface FormButtonProps {
  text: string;
  formAction?: string;
}

const FormButton = ({text, formAction}: FormButtonProps) => {
  return (
    <button
      type="submit"
      formAction={formAction}
      className={styles.button}
    >
      {text}
    </button>
  )
}

export default FormButton;