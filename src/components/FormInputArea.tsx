import styles from "./styles/formInputArea.module.css";

type Props = {
  type: string;
  name: string;
  value: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInputArea = ({ type, name, value, title, onChange }: Props) => {
  return (
    <div className={styles.form_control}>
      <label className={styles.form_title} htmlFor={name}>
        {title}
      </label>
      <input
        style={{ color: "black" }}
        className={styles.form_input}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormInputArea;
