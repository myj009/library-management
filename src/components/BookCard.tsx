import React from "react";
import styles from "./styles/bookCard.module.css";
import { BookWithId } from "../types/models.types";
import { useAuth } from "../contexts/AuthContext";
import { addNewBookLoan, closeBookLoan } from "../server/handlers";

type BookCardProps = {
  book: BookWithId;
  action?: "get" | "return";
};

const BookCard: React.FC<BookCardProps> = ({ book, action }) => {
  const { user } = useAuth();

  const getBook = async () => {
    try {
      await addNewBookLoan(book, user?.uid);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const returnBook = async () => {
    try {
      await closeBookLoan(book, user?.uid);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.book_card}>
        <img
          className={styles.book_card_image}
          src={book?.image_url}
          alt="book"
        />
      </div>
      <div className={styles.book_card_info}>
        <h2>{book?.title}</h2>
        <h3>{book?.author}</h3>
        <p>{book?.description}</p>
        <div className="d-flex justify-content-between">
          <p className="mt-1">
            {book?.tags.map((item) => (
              <span
                key={item}
                className={
                  `badge rounded-pill text-bg-primary ` + styles.tag_span
                }
              >
                {item}
              </span>
            ))}
          </p>
          {action === "get" && book.user_id === "" && (
            <button className="btn btn-primary" onClick={getBook}>
              Get book
            </button>
          )}
          {action === "return" && (
            <button className="btn btn-primary" onClick={returnBook}>
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
