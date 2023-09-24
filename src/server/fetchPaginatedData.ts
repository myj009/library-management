import { FilterFields, SortFields } from "../types/utils.types";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAfter,
  limit,
  endBefore,
  limitToLast,
} from "firebase/firestore";

export type EntityObject = {
  collection: string;
  recordsLimit: number;
  pageAction: "next" | "previous" | "none";
  page: number;
  sortFields: SortFields;
  lastIndex: null | number;
  firstIndex: null | number;
  filters?: FilterFields[];
};

export const fetchPaginatedData = async (entityObject: EntityObject) => {
  const {
    collection: collectionName,
    recordsLimit,
    pageAction,
    sortFields,
    lastIndex,
    firstIndex,
    filters,
  } = entityObject;

  const collectionRef = collection(db, collectionName);
  let queryRef = query(collectionRef);
  const newRecordsLimit = recordsLimit + 1;

  // add filters
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      queryRef = query(
        queryRef,
        where(filter.name, filter.operator, filter.value)
      );
    });
  }

  queryRef = query(queryRef, orderBy(sortFields.sortBy, sortFields.sortOrder));

  if (pageAction === "next") {
    queryRef = query(queryRef, startAfter(lastIndex), limit(newRecordsLimit));
  } else if (pageAction === "previous") {
    queryRef = query(
      queryRef,
      endBefore(firstIndex),
      limitToLast(recordsLimit)
    );
  } else if (pageAction === "none") {
    queryRef = query(queryRef, limit(newRecordsLimit));
  }

  const querySnapshot = await getDocs(queryRef);
  const records = querySnapshot.docs.map((doc) => {
    const record = doc.data();
    record.id = doc.id;
    return record;
  });

  return records;
};
