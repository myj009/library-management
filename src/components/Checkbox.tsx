type CheckboxProps = {
  checked: boolean;
  label: string;
  onChangeFunc: () => void;
};

const Checkbox = ({ checked, label, onChangeFunc }: CheckboxProps) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheck"
        checked={checked}
        onChange={onChangeFunc}
      />
      <label className="form-check-label" htmlFor="flexCheck">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
