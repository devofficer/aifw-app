import Section from "@/common/Section";
import styles from "./Description.module.css";
import FormTextField from "@/common/FormTextField";
import FormButton from "@/common/FormButton";
import DropDown from "@/common/DropDown";
import { models } from "@/config/models";

export const dynamic = "force-dynamic";

const Description = () => {
  return (
    <Section>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Upload Form</h3>
        <FormTextField name="name" label="Name" type="text" placeholder="" />
        <FormTextField name="email" label="Email" type="text" placeholder="" />
        <DropDown label="Country" items={models} />
        <FormTextField
          name="birthdate"
          label="BirthDate"
          type="text"
          placeholder=""
        />
        <DropDown label="AI tools" items={models} />
        <FormTextField
          name="instagram"
          label="Instagram"
          type="text"
          placeholder=""
        />
        <div className={styles.submit}>
          <FormButton text="Submit" />
        </div>
      </div>
    </Section>
  );
};

export default Description;
