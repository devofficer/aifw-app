"use client";

import LightBox from "@/components/LightBox";
import ImageLoader from "../ImageLoader";
import ImageViewer from "../ImageViewer";
import styles from "./DataTable.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Button";

interface ITableHeader {
  label: string;
  dataIndex: string;
}

const headers: ITableHeader[] = [
  { label: "Name", dataIndex: "name" },
  { label: "Email", dataIndex: "email" },
  { label: "Country", dataIndex: "country" },
  { label: "age", dataIndex: "age" },
  { label: "Ai Tools", dataIndex: "aiTool" },
  { label: "Instagram", dataIndex: "instagram" },
];

interface ITableItem {
  id: string;
  name: string;
  email: string;
  country: string;
  age: number;
  aiTool: string;
  instagram: string;
  status: boolean;
  images: string[];
}

const people: ITableItem[] = [
  {
    id: "1",
    name: "Lindsay Walton1",
    email: "lindsay.walton@example.com",
    country: "US",
    age: 28,
    aiTool: "Stable Diffusion",
    instagram: "hello",
    status: false,
    images: [
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
    ],
  },
  {
    id: "2",
    name: "Lindsay Walton2",
    email: "lindsay.walton@example.com",
    country: "US",
    age: 28,
    aiTool: "Stable Diffusion",
    instagram: "hello",
    status: true,
    images: [
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
    ],
  },
  {
    id: "3",
    name: "Lindsay Walton3",
    email: "lindsay.walton@example.com",
    country: "US",
    age: 28,
    aiTool: "Stable Diffusion",
    instagram: "hello",
    status: false,
    images: [
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
    ],
  },
  {
    id: "4",
    name: "Lindsay Walton4",
    email: "lindsay.walton@example.com",
    country: "US",
    age: 28,
    aiTool: "Stable Diffusion",
    instagram: "hello",
    status: true,
    images: [
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
      "https://pbxt.replicate.delivery/LEk61OmxgN6xMF5eDYP8zdxevuE4ihtxgNi22SbZqH9uznkRA/output-3.png",
    ],
  },
];

export default function DataTable() {
  const checkbox = useRef<any>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<any>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>Uploaded Images</h1>
          <p className={styles.headerDescription}>
            A list of all the users in your account including their name, email,
            instagram and images.
          </p>
        </div>
      </div>
      <div className={styles.flowRoot}>
        <div className={styles.overflow}>
          <div className={styles.innerBlock}>
            <div className={styles.relativeDiv}>
              {selectedPeople.length > 0 && (
                <div className={styles.buttons}>
                  <button type="button" className={styles.button}>
                    Bulk edit
                  </button>
                  <button type="button" className={styles.button}>
                    Delete all
                  </button>
                </div>
              )}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col" className={styles.tableHeaderCheckbox}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    {headers.map((header, idx) => {
                      return (
                        <th
                          key={idx}
                          scope="col"
                          className={styles.tableHeader}
                        >
                          {header.label}
                        </th>
                      );
                    })}
                    <th scope="col" className={styles.tableHeader}>
                      <span className="sr-only">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {people.map((person, idx) => (
                    <tr
                      key={idx}
                      className={
                        selectedPeople.includes(person) ? styles.row : undefined
                      }
                    >
                      <td className={styles.tableCellCheckbox}>
                        {selectedPeople.includes(person) && (
                          <div className={styles.rowBorderLeft} />
                        )}
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          value={person.email}
                          checked={selectedPeople.includes(person)}
                          onChange={(e) =>
                            setSelectedPeople((current: any) => {
                              return e.target.checked
                                ? [...current, person]
                                : current.filter((p: any) => p !== person);
                            })
                          }
                        />
                      </td>
                      {headers.map((header, idx) => {
                        if (idx === 0) {
                          return (
                            <td
                              key={idx}
                              className={`${styles.cell} ${styles.cellGray}`}
                            >
                              {person[header.dataIndex as keyof ITableItem]}
                              <div className={styles.imageContainer}>
                                {person.images.map((url, idx) => {
                                  return (
                                    <div
                                      className={styles.image}
                                      onClick={() => setSelectedUrl(url)}
                                    >
                                      <ImageLoader
                                        key={idx}
                                        idx={idx}
                                        url={url}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td key={idx} className={styles.cell}>
                            {person[header.dataIndex as keyof ITableItem]}
                          </td>
                        );
                      })}
                      <td className={styles.cell}>
                        <div className={styles.actions}>
                          {person.status ? (
                            <span className={styles.approvedItem}>
                              <CheckCircleIcon className={styles.icon} />
                              <span>Approved</span>
                            </span>
                          ) : (
                            <span className={styles.deniedItem}>
                              <MinusCircleIcon className={styles.icon} />
                              <span>Denied</span>
                            </span>
                          )}
                          <Button
                            size="sm"
                            variant={person.status ? "danger" : "success"}
                            text={person.status ? "Deny" : "Approve"}
                            handler={() => {}}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <LightBox url={selectedUrl} handleClose={setSelectedUrl} />
      </div>
    </div>
  );
}
