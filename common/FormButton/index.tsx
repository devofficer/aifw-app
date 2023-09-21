"use client";

import styles from "./FormButton.module.css";

interface FormButtonProps {
  text: string;
  loading: boolean;
  formAction?: string;
}

const FormButton = ({ text, formAction, loading }: FormButtonProps) => {
  return (
    <button
      disabled={loading}
      type="submit"
      formAction={formAction}
      className={styles.button}
    >
      {loading ? "uploading" : text}
    </button>
  );
};

export default FormButton;
