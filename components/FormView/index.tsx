"use client";

import DropDown from "@/common/DropDown";
import FormButton from "@/common/FormButton";
import FormFileInput from "@/common/FormFileInput";
import FormTextField from "@/common/FormTextField";
import Section from "@/common/Section";
import { countryNames, models } from "@/config/models";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import styles from "./FormView.module.css";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { string } from "yup";

export const dynamic = "force-dynamic";

interface IFormData {
  name: string;
  email: string;
  country: string;
  birthdate: string;
  aiTools: string;
  instagram: string;
  age: number;
  files: File[];
}

const FormView = () => {
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const [isLoading, setIsLoading] = useState(false);
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const handleSubmitAsync = async (formData: IFormData) => {
    setIsLoading(true);
    const promises = formData.files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(
          `${formData.email}_${Date.now()}_${file.name}`,
          formData.files[0],
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      return data?.path ?? "";
    });

    const uploadedNames = (await Promise.all(promises)).filter(
      (path) => path !== ""
    );

    const { data, error } = await supabase
      .from("uploads")
      .insert({
        name: formData.name,
        email: formData.email,
        country: formData.country,
        birthdate: formData.birthdate,
        aiTool: formData.aiTools,
        instagram: formData.instagram,
        age: formData.age,
        images: uploadedNames,
      })
      .select();
    if (error) {
      toast.error(error.message);
    } else if (data) {
      toast.success("Your data is saved on the server");
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: any) => {
    if (data.files.length === 0) {
      toast.error("You have to add at least 1 file.");
      return;
    }
    await handleSubmitAsync(data);
  };

  const handleCreateUser = async () => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: "serviusapolum@gmail.com",
      password: "password",
      user_metadata: { name: "Yanko" },
    });
    console.log(data);
  };

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Upload Form</h3>
          <FormTextField
            name="name"
            label="Name"
            type="text"
            placeholder=""
            setValue={setValue}
          />
          <FormTextField
            name="email"
            label="Email"
            type="email"
            placeholder=""
            setValue={setValue}
          />
          <FormTextField
            name="age"
            label="Age"
            type="number"
            placeholder=""
            setValue={setValue}
          />
          <DropDown
            name="country"
            label="Country"
            items={countryNames}
            setValue={setValue}
          />
          <FormTextField
            name="birthdate"
            label="BirthDate"
            type="date"
            placeholder=""
            setValue={setValue}
          />
          <DropDown
            name="aiTools"
            label="AI tools"
            items={models}
            setValue={setValue}
          />
          <FormTextField
            name="instagram"
            label="Instagram"
            type="text"
            placeholder=""
            setValue={setValue}
          />
          <FormFileInput name="files" setValue={setValue} />
          <div className={styles.submit}>
            <FormButton text="Submit" loading={isLoading} />
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        theme="light"
      />
    </Section>
  );
};

export default FormView;
