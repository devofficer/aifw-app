"use client";

import React, { useRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import styles from "./FormFileInput.module.css";
import Image from "next/image";

const FormFileInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    setSelectedFiles(files);
  };

  return (
    <div>
      <div onClick={handleClick} className={styles.wrapper}>
        <CloudArrowUpIcon className={styles.icon} />
        <span>Choose some files to upload</span>
        <input
          multiple
          type="file"
          ref={ref}
          className={styles.fileInput}
          onChange={handleChange}
        />
      </div>
      {/* 6. display selected files */}
      {!!selectedFiles.length && (
        <div className={styles.files}>
          <p>Selected Files:</p>
          {selectedFiles.map((file, i) => {
            return (
              <span key={i} className={styles.fileItem}>
                {file.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormFileInput;
