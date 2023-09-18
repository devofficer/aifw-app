"use client";

import styles from "./DataTable.module.css";
import { useLayoutEffect, useRef, useState } from "react";

interface ITableItem {
  id: string;
  name: string;
  email: string;
  country: string;
  age: number;
  aiTool: string;
  instagram: string;
  status: boolean;
}

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton1",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton2",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function DataTable() {
  const checkbox = useRef<any>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<any>([]);

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
          <h1 className={styles.headerTitle}>Users</h1>
          <p className={styles.headerDescription}>
            A list of all the users in your account including their name, title,
            email, and role.
          </p>
        </div>
        <div className={styles.addButtonWrapper}>
          <button type="button" className={styles.addButton}>
            Add user
          </button>
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
                    <th
                      scope="col"
                      className={`${styles.tableHeader} ${styles.tableHeaderName}`}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className={`${styles.tableHeader} ${styles.tableHeaderOthers}`}
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className={`${styles.tableHeader} ${styles.tableHeaderOthers}`}
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className={`${styles.tableHeader} ${styles.tableHeaderOthers}`}
                    >
                      Role
                    </th>
                    <th scope="col" className={styles.talbeHeaderEdit}>
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {people.map((person) => (
                    <tr
                      key={person.email}
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
                      <td className={`${styles.cell} ${styles.cellHighlight}`}>
                        {person.name}
                      </td>
                      <td className={`${styles.cell} ${styles.cellGray}`}>
                        {person.title}
                      </td>
                      <td className={`${styles.cell} ${styles.cellGray}`}>
                        {person.email}
                      </td>
                      <td className={`${styles.cell} ${styles.cellGray}`}>
                        {person.role}
                      </td>
                      <td className={styles.cell}>
                        <a
                          href="#"
                          className={styles.cellLink}
                          onClick={(e) => e.preventDefault()}
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
