import Messages from './messages'

import styles from "./login.module.css";
import FormTextField from '@/common/FormTextField';
import FormButton from '@/common/FormButton';

export default function Login() {
  return (
    <div className={styles.container}>
      <Messages />
      <form
        className={styles.form}
        action="/auth/sign-in"
        method="post"
      >
        <FormTextField type="text" name="email" placeholder="you@example.com" label="Email" />
        <FormTextField type="password" name="password" placeholder="••••••••" label="Password" />
        <FormButton text="Sign In" />
        <FormButton text="Register" formAction="/auth/sign-up" />
      </form>
    </div>
  )
}
