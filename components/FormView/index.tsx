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
  const [pageStep, setPageStep] = useState(0);

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const handleSubmitAsync = async (formData: IFormData) => {
    setIsLoading(true);
    const promises = formData.files.map(async (file, idx) => {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(
          `${formData.email}_${Date.now()}_${file.name}`,
          formData.files[idx],
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
        images: uploadedNames,
      })
      .select();
    if (error) {
      setPageStep(2);
    } else if (data) {
      setPageStep(1);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: any) => {
    if (data.country === "Choose") {
      toast.error("You have to select country");
      return;
    }
    if (data.aiTools === "Choose") {
      toast.error("You have to select AI Tool");
      return;
    }
    if (data.files.length === 0) {
      toast.error("You have to add at least 1 file.");
      return;
    }
    await handleSubmitAsync(data);
  };

  return (
    <section className={styles.container}>
      {pageStep === 0 && (
        <>
          <h1 className={styles.header}>WELCOME TO AIFW SEASON 2</h1>
          <h1 className={styles.header}>
            TO APPLY FILL THE APPLICATION FORM BELOW.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapper}>
              <h3 className={styles.title}>Upload Form</h3>
              <FormTextField
                name="name"
                label="Name"
                type="text"
                placeholder="user"
                setValue={setValue}
              />
              <FormTextField
                name="email"
                label="Email"
                type="email"
                placeholder="user@example.com"
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
                name="country"
                label="Country"
                items={countryNames}
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
                placeholder="https://instagram.com/user"
                setValue={setValue}
              />
              <FormFileInput name="files" setValue={setValue} />
              <div className={styles.submit}>
                <FormButton text="Submit" loading={isLoading} />
              </div>
            </div>
          </form>
        </>
      )}
      {pageStep === 1 && (
        <h1 className={styles.header}>Your Form is submitted!</h1>
      )}
      {pageStep === 2 && (
        <h1 className={styles.error}>Your Form is not submitted!</h1>
      )}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        theme="light"
      />
    </section>
  );
};

export default FormView;
