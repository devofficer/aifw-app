"use client";

import LightBox from "@/components/LightBox";
import ImageLoader from "../ImageLoader";
import styles from "./DataTable.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Pagination from "../Pagination";
import Loading from "../Loading";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ITableHeader {
  label: string;
  dataIndex: string;
}

const headers: ITableHeader[] = [
  { label: "Name", dataIndex: "name" },
  { label: "Email", dataIndex: "email" },
  { label: "Country", dataIndex: "country" },
  { label: "Birthdate", dataIndex: "birthdate" },
  { label: "Ai Tools", dataIndex: "aiTool" },
  { label: "Instagram", dataIndex: "instagram" },
];

interface ITableItem {
  id: string;
  name: string;
  email: string;
  country: string;
  aiTool: string;
  birthdate: string;
  instagram: string;
  status: number;
  images: string[];
}

export default function DataTable() {
  const supabase = createClientComponentClient();

  const checkbox = useRef<any>();
  const itemsPerPage = 10;
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [items, setItems] = useState<ITableItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITableItem[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedItems.length > 0 && selectedItems.length < items.length;
    setChecked(
      selectedItems.length === items.length && selectedItems.length > 0
    );
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedItems]);

  function toggleAll() {
    setSelectedItems(
      checked || indeterminate ? [] : items.filter((item) => item.status === 0)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const loadItems = async () => {
    setIsLoading(true);
    const { count } = await supabase
      .from("uploads")
      .select("*", { count: "exact" });
    if (count) setTotalCount(count);

    const { data: items, error } = await supabase
      .from("uploads")
      .select("*")
      .order("status", { ascending: false })
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
    if (items) setItems(items);
    setIsLoading(false);
  };

  const updateItems = (data: ITableItem[]) => {
    const newItems = [...items];
    data.forEach((updatedItem) => {
      const idx = newItems.findIndex((item) => item.id === updatedItem.id);
      newItems[idx] = updatedItem;
    });
    setItems(newItems);
  };

  const handleAllow = async (selectedIds: string[], status: number) => {
    const { data, error } = await supabase
      .from("uploads")
      .update({ status: status })
      .in("email", selectedIds)
      .select("*");
    if (!error) {
      updateItems(data);
      data.forEach((item) => {
        handleSendingEmails(item.name, item.email, item.status);
      });
    }
  };

  const handleAllowBulk = async (status: boolean) => {
    const selectedIds = selectedItems.map((item) => item.email);
    await handleAllow(selectedIds, status ? 1 : 2);
    setSelectedItems([]);
  };

  const handleSendingEmails = async (
    name: string,
    email: string,
    status: boolean
  ) => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID as string,
        {
          to_name: name,
          to_email: email,
          status: status ? "Approved" : "Denied",
        },
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result: any) => {
          toast.info(`Email sent to ${name}:${email}`);
        },
        (error: any) => {
          // show the user an error
          toast.error(`Email is not sent to ${name}:${email}`);
          console.log(error);
        }
      );
  };

  useEffect(() => {
    loadItems();
  }, [currentPage]);

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
              {selectedItems.length > 0 && (
                <div className={styles.buttons}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleAllowBulk(true)}
                  >
                    Bulk Approve
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => handleAllowBulk(false)}
                  >
                    Bulk Deny
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
                  {items.map((item, idx) => (
                    <tr
                      key={idx}
                      className={
                        selectedItems.includes(item) ? styles.row : undefined
                      }
                    >
                      <td className={styles.tableCellCheckbox}>
                        {selectedItems.includes(item) && (
                          <div className={styles.rowBorderLeft} />
                        )}
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={selectedItems.includes(item)}
                          onChange={(e) =>
                            setSelectedItems((current: any) => {
                              return e.target.checked
                                ? [...current, item]
                                : current.filter((p: any) => p !== item);
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
                              {item[header.dataIndex as keyof ITableItem]}
                              <div className={styles.imageContainer}>
                                {item.images.map((url, idx) => {
                                  console.log(url);
                                  return (
                                    <div
                                      key={idx}
                                      className={styles.image}
                                      onClick={() =>
                                        setSelectedUrls(item.images)
                                      }
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
                            {item[header.dataIndex as keyof ITableItem]}
                          </td>
                        );
                      })}
                      <td className={styles.cell}>
                        <div className={styles.actions}>
                          {item.status === 0 ? (
                            <>
                              <Button
                                size="sm"
                                variant={"danger"}
                                text={"Deny"}
                                handler={() => handleAllow([item.email], 2)}
                              />
                              <Button
                                size="sm"
                                variant={"success"}
                                text={"Approve"}
                                handler={() => handleAllow([item.email], 1)}
                              />
                            </>
                          ) : item.status === 1 ? (
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <LightBox urls={selectedUrls} handleClose={setSelectedUrls} />
      </div>
      <Pagination
        totalItemCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeOnClick
        theme="light"
      />
      {isLoading && <Loading />}
    </div>
  );
}
