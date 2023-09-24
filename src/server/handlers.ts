import { BookLoan, BookWithId } from "../types/models.types";
import { getActiveBookLoan, postBookLoan, updateBookLoan } from "./bookLoans";
import { updateBook } from "./books";

export const addNewBookLoan = async (book: BookWithId, userId?: string) => {
  if (!userId) {
    return new Error("User not logged in");
  }
  const newBook = { ...book, user_id: userId };
  const bookLoan: BookLoan = {
    book_id: book.id,
    user_id: userId,
    start_date: new Date(),
    end_date: null,
    isActive: true,
  };

  try {
    await postBookLoan(bookLoan);
    await updateBook(newBook);
  } catch (error) {
    return error;
  }
};

export const closeBookLoan = async (book: BookWithId, userId?: string) => {
  if (!userId) {
    return new Error("User not logged in");
  }
  if (book.user_id !== userId) {
    return new Error("User not authorized");
  }

  const newBook = { ...book, user_id: "" };
  try {
    await updateBook(newBook);
  } catch (error) {
    return error;
  }

  try {
    const bookLoan = await getActiveBookLoan(userId, book.id);
    if (!bookLoan) {
      return new Error("Book loan not found");
    }
    bookLoan.isActive = false;
    bookLoan.end_date = new Date();
    await updateBookLoan(bookLoan);
  } catch (error) {
    return error;
  }
};
