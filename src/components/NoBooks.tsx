import styles from "./styles/noBook.module.css";

type NoBooksProps = {
  text: string;
};

const NoBooks = ({ text }: NoBooksProps) => {
  return (
    <div className={styles.main_div}>
      <img
        className={styles.img}
        src="./assets/no_book.jpg"
        alt="Book not found"
      />
      <h1>{text}</h1>
    </div>
  );
};

export default NoBooks;
