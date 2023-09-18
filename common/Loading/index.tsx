import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <div className={styles.label}>Generating</div>
    </div>
  )
}

export default Loading;