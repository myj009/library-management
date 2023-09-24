import { db, storage } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Book, BookWithId } from "../types/models.types";
import { v4 as uuidv4 } from "uuid";

const booksCollection = collection(db, "books");

// function get books - from firestore
export const getBooks = async (userId?: string) => {
  if (!userId) {
    return [];
  }
  const q = query(booksCollection, where("user_id", "==", userId));
  try {
    const querySnapshot = await getDocs(q);
    const books: BookWithId[] = [];
    querySnapshot.forEach((doc) => {
      const book: BookWithId = {
        title: doc.data().title,
        author: doc.data().author,
        description: doc.data().description,
        image_url: doc.data().image_url,
        user_id: doc.data().user_id,
        tags: doc.data().tags,
        id: doc.id,
      };
      books.push(book);
    });
    return books;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return [];
  }
};

export const getAvailableBooks = async () => {
  const q = query(booksCollection, where("user_id", "==", ""));
  const querySnapshot = await getDocs(q);
  const books: BookWithId[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    console.log(doc.id);
    const book: BookWithId = {
      title: doc.data().title,
      author: doc.data().author,
      description: doc.data().description,
      image_url: doc.data().image_url,
      user_id: doc.data().user_id,
      tags: doc.data().tags,
      id: doc.id,
    };
    books.push(book);
  });
  return books;
};

export const postBook = async (book: Book, id: string) => {
  const bookDocRef = doc(booksCollection, id);
  try {
    await setDoc(bookDocRef, book);
    console.log("Book added");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const deleteBook = async (bookId: string) => {
  // delete book from firestore
  const bookRef = doc(db, "books", bookId);
  await deleteDoc(bookRef);
  console.log("Document deleted with ID: ", bookId);
};

export const updateBook = async (book: BookWithId) => {
  // update book from firestore
  const bookRef = doc(db, "books", book.id);
  const bookWithoutId: Book = { ...book };
  try {
    await updateDoc(bookRef, bookWithoutId);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
  console.log("Document updated with ID: ", book.id);
};

export const addBook = async (book: Book, image: File) => {
  const bookId = uuidv4();
  try {
    // 1. Create a reference to the storage location where you want to upload the image.
    const storageRef = ref(storage, `bookImages/${bookId}`);

    // 2. Upload the image to the specified storage location.
    await uploadBytes(storageRef, image);

    // 3. Get the download URL for the uploaded image.
    const downloadURL = await getDownloadURL(storageRef);
    book.image_url = downloadURL;

    // Now, you can use the downloadURL as needed, for example, to store it in your database along with book details.
    console.log("Image uploaded to Firebase:", downloadURL);

    await postBook(book, bookId);

    // Add your book details and downloadURL to the database here.
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
