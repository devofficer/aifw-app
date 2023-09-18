'use client'

import { useSearchParams } from 'next/navigation'
import styles from "./login.module.css";

export default function Messages() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </>
  )
}
