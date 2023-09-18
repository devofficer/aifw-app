"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clxs from "classnames";
import styles from "./DropDown.module.css";

interface ItemType {
  id: number;
  name: string;
}

interface DropDownProps {
  label: string;
  items: ItemType[];
}

const DropDown = ({ label, items }: DropDownProps) => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className={styles.container}>
              <Listbox.Button className={styles.selector}>
                <span className={styles.selectorName}>{selected.name}</span>
                <span className={styles.selectorIconWrapper}>
                  <ChevronDownIcon
                    className={clxs(styles.selectorIcon, styles.icon)}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className={styles.listBox}>
                  {items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        clxs(styles.listOption, active ? styles.active : "")
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clxs(
                              styles.listItemName,
                              active ? styles.active : ""
                            )}
                          >
                            {item.name}
                          </span>

                          {selected ? (
                            <span
                              className={clxs(
                                styles.listItemContent,
                                active ? styles.active : ""
                              )}
                            >
                              <CheckIcon
                                className={styles.icon}
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default DropDown;
