import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import FormActionButton from "../FormActionButton";

import styles from "./NavLinks.module.css";

export const dynamic = "force-dynamic";

const NavLinks = async () => {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className={styles.container}>
      <Link href="/gallery" className={styles.linkItem}>Gallery</Link>
      <span className={styles.linkItem}>|</span>
      {user && <Link href="/archive" className={styles.linkItem}>Archive</Link>}
      {user && <span className={styles.linkItem}>|</span>}
      {user ? 
        <FormActionButton formAction="/auth/sign-out" text="Sign Out" /> : 
        <Link href="/login" className={styles.linkItem}>Login</Link>
      }
    </div>
  )
}

export default NavLinks;