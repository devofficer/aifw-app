import Messages from "./messages";

import styles from "./login.module.css";
import FormTextField from "@/common/FormTextField";
import FormButton from "@/common/FormButton";
import FormServerTextField from "@/common/FormServerTextField";

export default function Login() {
  return (
    <div className={styles.container}>
      <Messages />
      <form className={styles.form} action="/auth/sign-in" method="post">
        <FormServerTextField
          type="text"
          name="email"
          placeholder="you@example.com"
          label="Email"
        />
        <FormServerTextField
          type="password"
          name="password"
          placeholder="••••••••"
          label="Password"
        />
        <FormButton text="Sign In" loading={false} />
        <FormButton
          text="Register"
          formAction="/auth/sign-up"
          loading={false}
        />
      </form>
    </div>
  );
}
