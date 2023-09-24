import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { BookLoan, BookLoanWithId } from "../types/models.types";
import { v4 as uuidv4 } from "uuid";

const bookLoansCollection = collection(db, "book_loans");

// function get bookLoans - from firestore
export const getBookLoans = async (userId?: string, bookId?: string) => {
  const q = query(
    bookLoansCollection,
    ...(bookId ? [where("book_id", "==", bookId)] : []),
    ...(userId ? [where("user_id", "==", userId)] : [])
  );
  const querySnapshot = await getDocs(q);
  const bookLoans: BookLoanWithId[] = [];
  querySnapshot.forEach((doc) => {
    const bookLoan: BookLoanWithId = {
      id: doc.id,
      ...(doc.data() as BookLoan),
    };
    bookLoans.push(bookLoan);
  });
  return bookLoans;
};

export const getActiveBookLoans = async (userId?: string) => {
  const q = query(
    bookLoansCollection,
    ...(userId ? [where("user_id", "==", userId)] : []),
    where("isActive", "==", true)
  );
  const querySnapshot = await getDocs(q);
  const bookLoans: BookLoanWithId[] = [];
  querySnapshot.forEach((doc) => {
    const bookLoan: BookLoanWithId = {
      id: doc.id,
      ...(doc.data() as BookLoan),
    };
    bookLoans.push(bookLoan);
  });
  return bookLoans;
};

export const getActiveBookLoan = async (userId?: string, bookId?: string) => {
  const q = query(
    bookLoansCollection,
    ...(userId ? [where("user_id", "==", userId)] : []),
    ...(bookId ? [where("book_id", "==", bookId)] : []),
    where("isActive", "==", true)
  );
  const querySnapshot = await getDocs(q);
  const bookLoans: BookLoanWithId[] = [];
  if (querySnapshot.size === 0) {
    return null;
  }
  if (querySnapshot.size > 1) {
    throw new Error("More than one active book loan found");
  }
  querySnapshot.forEach((doc) => {
    const bookLoan: BookLoanWithId = {
      id: doc.id,
      ...(doc.data() as BookLoan),
    };
    bookLoans.push(bookLoan);
  });
  return bookLoans[0];
};

export const postBookLoan = async (bookLoan: BookLoan) => {
  const bookLoanId = uuidv4();
  const bookDocRef = doc(bookLoansCollection, bookLoanId);
  try {
    await setDoc(bookDocRef, bookLoan);
    console.log("Book loan added");
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
  console.log("Document written with ID: ", bookLoanId);
};

export const updateBookLoan = async (bookLoan: BookLoanWithId) => {
  // update bookLoan from firestore
  const bookLoanRef = doc(db, "book_loans", bookLoan.id);
  const bookLoanData: BookLoan = { ...bookLoan };
  try {
    await updateDoc(bookLoanRef, bookLoanData);
    console.log("Document updated with ID: ", bookLoan.id);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
