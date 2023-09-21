"use client";

import LightBox from "@/components/LightBox";
import ImageLoader from "../ImageLoader";
import ImageViewer from "../ImageViewer";
import styles from "./DataTable.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Pagination from "../Pagination";
import Loading from "../Loading";

interface ITableHeader {
  label: string;
  dataIndex: string;
}

const headers: ITableHeader[] = [
  { label: "Name", dataIndex: "name" },
  { label: "Email", dataIndex: "email" },
  { label: "Country", dataIndex: "country" },
  { label: "Age", dataIndex: "age" },
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

export default function DataTable() {
  const supabase = createClientComponentClient();

  const checkbox = useRef<any>();
  const itemsPerPage = 1;
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [items, setItems] = useState<ITableItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ITableItem[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>("");
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
      .order("id", { ascending: false })
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

  const handleAllow = async (selectedIds: string[], status: boolean) => {
    const { data, error } = await supabase
      .from("uploads")
      .update({ status: status })
      .in("id", selectedIds)
      .select("*");
    if (!error) {
      updateItems(data);
    }
  };

  const handleAllowBulk = async (status: boolean) => {
    const selectedIds = selectedItems.map((item) => item.id);
    await handleAllow(selectedIds, status);
    setSelectedItems([]);
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
                          key={header.label}
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
                            {item[header.dataIndex as keyof ITableItem]}
                          </td>
                        );
                      })}
                      <td className={styles.cell}>
                        <div className={styles.actions}>
                          {item.status ? (
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
                            variant={item.status ? "danger" : "success"}
                            text={item.status ? "Deny" : "Approve"}
                            handler={() => handleAllow([item.id], !item.status)}
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
      <Pagination
        totalItemCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      {isLoading && <Loading />}
    </div>
  );
}
