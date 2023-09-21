import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import FormView from "@/components/FormView";
import Banner from "@/components/Banner";
import styles from "./app.module.css";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className={styles.container}>
      <Banner />
      <FormView />
    </div>
  );
}
