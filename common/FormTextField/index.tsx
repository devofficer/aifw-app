import styles from "./FormTextField.module.css";

interface FormTextFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}

const FormTextField = ({ name, type, label, placeholder }: FormTextFieldProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder}
        className={styles.input} 
      />
    </div>
  );
}

export default FormTextField;