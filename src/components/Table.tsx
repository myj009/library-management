import { useEffect, useState } from "react";
import { fetchPaginatedData } from "../server/fetchPaginatedData";
import { FilterFields, SortFields } from "../types/utils.types";
import { EntityObject } from "../server/fetchPaginatedData";
import { BookWithId } from "../types/models.types";
import BookCard from "./BookCard";
import styles from "./styles/table.module.css";
import NoBooks from "./NoBooks";

type TableProps = {
  collection: string;
  sortFields: SortFields;
  action: "get" | "return";
  filters?: FilterFields[];
};

const Table = ({ collection, sortFields, filters, action }: TableProps) => {
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<BookWithId[]>([]);
  const [pageAction, setPageAction] = useState<"next" | "previous" | "none">(
    "none"
  );
  const [afterThis, setAfterThis] = useState(null);
  const [beforeThis, setBeforeThis] = useState(null);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    setPage(page + 1);
    setPageAction("next");
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
    setPageAction("previous");
  };

  const fetchData = async () => {
    const PAGE_SIZE = 10;
    const entityObject: EntityObject = {
      collection: collection,
      recordsLimit: PAGE_SIZE,
      pageAction: pageAction,
      page: page,
      sortFields: sortFields,
      lastIndex: afterThis,
      firstIndex: beforeThis,
      filters: filters,
    };

    try {
      setLoading(true);
      const docs = await fetchPaginatedData(entityObject);
      if (docs.length > 0) {
        if (docs.length > PAGE_SIZE || pageAction === "previous") {
          setLastPage(false);
        } else {
          setLastPage(true);
        }
        const lastIndex = docs.length - 1;
        const firstIndex = 0;

        setAfterThis(docs[lastIndex][entityObject.sortFields.sortBy]);
        setBeforeThis(docs[firstIndex][entityObject.sortFields.sortBy]);
        setPageAction("none");
        const tempBooks: BookWithId[] = [];
        docs.forEach((doc) => {
          const book: BookWithId = {
            title: doc.title,
            author: doc.author,
            description: doc.description,
            image_url: doc.image_url,
            user_id: doc.user_id,
            tags: doc.tags,
            id: doc.id,
          };
          tempBooks.push(book);
        });
        setBooks(tempBooks);
        setLoading(false);
      } else {
        console.log("No more books");
        setBooks([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, collection, sortFields, filters]);

  return (
    <>
      {!loading ? (
        <>
          {books.length === 0 ? (
            <NoBooks text="You do not have any books" />
          ) : (
            <>
              <div className={styles.books_div}>
                {books.map((book) =>
                  action === "get" && book.user_id !== "" ? (
                    <BookCard key={book.id} book={book} />
                  ) : (
                    <BookCard key={book.id} book={book} action={action} />
                  )
                )}
              </div>
              <div className={styles.pagination_div}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePreviousPage}
                  disabled={page === 1 && books.length === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextPage}
                  disabled={lastPage}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
