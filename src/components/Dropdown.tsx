import { FormEventHandler } from "react";

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  selectedValue: string;
  onChange: FormEventHandler<HTMLSelectElement>;
  title: string;
};

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  title,
}: DropdownProps) => {
  return (
    <>
      <label htmlFor="tags" className="form-label">
        <h5>
          <strong>{title}</strong>
        </h5>
      </label>
      <select
        className="form-select"
        aria-label="Select tags"
        onChange={onChange}
        id="tags"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === selectedValue}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
