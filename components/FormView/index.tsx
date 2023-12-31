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
import Image from "next/image";
import { sendEmail } from "@/utils/email";

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
        instagram: `https://www.instagram.com/${formData.instagram}/`,
        images: uploadedNames,
      })
      .select();
    if (error) {
      setPageStep(2);
    } else if (data) {
      setPageStep(1);

      sendEmail(process.env.NEXT_PUBLIC_EMAIL_JS_UPLOAD_TEMPLATE_ID as string, {
        to_email: formData.email,
      }).then(
        (result: any) => {
          // toast.info(`Email sent to ${item.name}:${item.email}`);
        },
        (error: any) => {
          // show the user an error
          // toast.error(`Email is not sent to ${item.name}:${item.email}`);
          console.log(error);
        }
      );
    }
    setIsLoading(false);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (data: any) => {
    if (!isValidEmail(data.email)) {
      toast.error("You have to use valid email");
      return;
    }
    if (data.country === "Choose") {
      toast.error("You have to select country");
      return;
    }
    if (data.aiTools === "Choose") {
      toast.error("You have to select AI Tool");
      return;
    }
    if (data.files.length !== 5) {
      toast.error("You have to select 5 images.");
      return;
    }
    await handleSubmitAsync(data);
  };

  return (
    <section className={styles.container}>
      {pageStep === 0 && (
        <>
          <Image
            alt="logo"
            src="/assets/logo.png"
            width={299}
            height={209}
            className={styles.logo}
          />
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
                placeholder="instagramId"
                setValue={setValue}
              />
              <FormFileInput name="files" setValue={setValue} />
              <div className={styles.submit}>
                <FormButton text="Submit" loading={isLoading} />
              </div>
            </div>
          </form>
          <h1 className={styles.header}>Entry Ends: 30d:22h:01m:12s</h1>
        </>
      )}
      {pageStep === 1 && (
        <div className={styles.resultWrapper}>
          <h1 className={styles.header}>Your Form is submitted!</h1>
        </div>
      )}
      {pageStep === 2 && (
        <div className={styles.resultWrapper}>
          <h1 className={styles.error}>Your Form is not submitted!</h1>
        </div>
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
