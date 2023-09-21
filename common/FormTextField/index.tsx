import { ChangeEvent } from "react";
import styles from "./FormTextField.module.css";

interface FormTextFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  setValue: any;
}

const FormTextField = ({
  name,
  type,
  label,
  placeholder,
  setValue,
}: FormTextFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.input}
        required
      />
    </div>
  );
};

export default FormTextField;
