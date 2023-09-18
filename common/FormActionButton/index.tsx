import styles from "./FormActionButton.module.css";

interface FormActionButtonProps {
  text: string;
  formAction?: string;
}

const FormActionButton = ({ text, formAction }: FormActionButtonProps) => {
  return (
    <form action={formAction} method="post">
      <button
        type="submit"
        className={styles.button}
      >
        {text}
      </button>
    </form >
  )
}

export default FormActionButton;