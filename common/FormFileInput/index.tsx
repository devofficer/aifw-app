"use client";

import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import styles from "./FormFileInput.module.css";

interface IFormFileInputProps {
  name: string;
  setValue: any;
}

const FormFileInput = ({ name, setValue }: IFormFileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []).slice(0, 5);
    setSelectedFiles(files);
    setValue(name, files);
  };

  const handleRemove = (idx: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(idx, 1);
    setSelectedFiles(newSelectedFiles);
  };

  useEffect(() => {
    setValue(name, []);
  }, []);

  return (
    <div>
      <div onClick={handleClick} className={styles.wrapper}>
        <CloudArrowUpIcon className={styles.icon} />
        <span>Upload your 5 Images</span>
        <span>Max 2MB</span>
        <input
          multiple
          name={name}
          type="file"
          ref={ref}
          accept="image/*"
          className={styles.fileInput}
          onChange={handleChange}
        />
      </div>
      {/* 6. display selected files */}
      {!!selectedFiles.length && (
        <div className={styles.files}>
          <p>Selected Files:</p>
          {selectedFiles.map((file, idx) => {
            return (
              <span key={idx} className={styles.fileItem}>
                {file.name}
                <span onClick={() => handleRemove(idx)}>
                  <XMarkIcon className={styles.closeIcon} />
                </span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormFileInput;
