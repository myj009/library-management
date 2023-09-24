import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Checkbox from "../components/Checkbox";
import styles from "./styles/home.module.css";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import { FilterFields } from "../types/utils.types";
import { dropdownOptions } from "../utils/common";

const Books = () => {
  const [checked, setChecked] = useState(true);
  const [dropdownValue, setDropdownValue] = useState("All");
  const [filters, setFilters] = useState<FilterFields[]>([
    {
      name: "user_id",
      operator: "==",
      value: "",
    },
  ]);

  const onCheckboxChange = () => {
    setChecked(!checked);
  };

  const onDropdownChange: React.FormEventHandler<HTMLSelectElement> = (e) => {
    setDropdownValue(e.currentTarget.value);
  };

  useEffect(() => {
    const tempfilters: FilterFields[] = [];
    if (checked) {
      tempfilters.push({
        name: "user_id",
        operator: "==",
        value: "",
      });
    }
    if (dropdownValue !== "All") {
      tempfilters.push({
        name: "tags",
        operator: "array-contains",
        value: dropdownValue,
      });
    }
    setFilters(tempfilters);
  }, [checked, dropdownValue]);

  return (
    <>
      <Header />
      <div className={styles.main_div}>
        <div className={styles.filters}>
          <div className={styles.dropdown}>
            <Dropdown
              selectedValue={dropdownValue}
              onChange={onDropdownChange}
              options={dropdownOptions}
              title="Tags"
            />
          </div>
          <Checkbox
            label="Only Available Books"
            checked={checked}
            onChangeFunc={onCheckboxChange}
          />
        </div>
        <Table
          collection="books"
          sortFields={{ sortBy: "title", sortOrder: "asc" }}
          filters={filters}
          action="get"
        />
      </div>
    </>
  );
};

export default Books;
