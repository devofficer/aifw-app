"use client";

import LightBox from "@/components/LightBox";
import { sendEmail } from "@/utils/email";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios, { AxiosRequestConfig } from "axios";
import JSZip from "jszip";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CsvDownloader from "react-csv-downloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";
import ImageLoader from "../ImageLoader";
import Loading from "../Loading";
import Pagination from "../Pagination";
import styles from "./DataTable.module.css";

import { saveAs } from "file-saver";

interface ITableHeader {
  label: string;
  dataIndex: string;
}

interface ITableColumn {
  id: string;
  displayName: string;
}

const headers: ITableHeader[] = [
  { label: "Name", dataIndex: "name" },
  { label: "Email", dataIndex: "email" },
  { label: "Country", dataIndex: "country" },
  { label: "Birthdate", dataIndex: "birthdate" },
  { label: "Ai Tools", dataIndex: "aiTool" },
  { label: "Instagram", dataIndex: "instagram" },
];

const columns: ITableColumn[] = [
  { displayName: "Name", id: "name" },
  { displayName: "Email", id: "email" },
  { displayName: "Country", id: "country" },
  { displayName: "Birthdate", id: "birthdate" },
  { displayName: "Ai Tools", id: "aiTool" },
  { displayName: "Instagram", id: "instagram" },
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
    setSelectedItems(checked || indeterminate ? [] : items);
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
      const idx = newItems.findIndex(
        (item) => item.email === updatedItem.email
      );
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
        sendEmail(
          process.env.NEXT_PUBLIC_EMAIL_JS_STATUS_TEMPLATE_ID as string,
          { to_name: item.name, to_email: item.email, status: item.status }
        ).then(
          (result: any) => {
            toast.info(`Email sent to ${item.name}:${item.email}`);
          },
          (error: any) => {
            // show the user an error
            toast.error(`Email is not sent to ${item.name}:${item.email}`);
            console.log(error);
          }
        );
      });
    }
  };

  const handleAllowBulk = async (status: boolean) => {
    const selectedIds = selectedItems
      .filter((item) => item.status === 0)
      .map((item) => item.email);
    await handleAllow(selectedIds, status ? 1 : 2);
    setSelectedItems([]);
  };

  const handleDownload = () => {
    const images = selectedItems.reduce<string[]>((prev, item) => {
      console.log(prev);
      return [...prev, ...item.images];
    }, []);

    const zip = new JSZip();
    const imgFolder = zip.folder("images");
    const promises: any[] = [];
    let ext: string = "";
    images.map((url, i) =>
      promises.push(
        axios({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
          responseType: "blob",
          crossDomain: true,
        } as AxiosRequestConfig)
          .then((response) => {
            ext = response.headers["content-type"].split("/")[1];
            return response.data;
          })
          .then((data) => {
            return imgFolder?.file(`images-${i}.${ext}`, data);
          })
      )
    );
    Promise.all(promises).then(() =>
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // see FileSaver.js
        saveAs(content, "document.zip");
      })
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
                  <CsvDownloader
                    filename={`data_page_${currentPage}`}
                    extension=".csv"
                    columns={columns}
                    datas={items as any}
                  >
                    <button type="button" className={styles.button}>
                      Export as CSV
                    </button>
                  </CsvDownloader>

                  <button
                    type="button"
                    className={styles.button}
                    onClick={handleDownload}
                  >
                    Export Images
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
                        if (idx === 5) {
                          return (
                            <td key={idx} className={styles.cell}>
                              <Link
                                className={styles.link}
                                href={
                                  item[
                                    header.dataIndex as keyof ITableItem
                                  ] as string
                                }
                                target="_blank"
                              >
                                {item[header.dataIndex as keyof ITableItem]}
                              </Link>
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
