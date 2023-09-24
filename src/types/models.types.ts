export type User = {
  email: string;
};

export type Book = {
  title: string;
  author: string;
  description: string;
  image_url: string;
  user_id: string;
  tags: string[];
};

export type BookWithId = Book & {
  id: string;
};

export type BookLoan = {
  book_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date | null;
  isActive: boolean;
};

export type BookLoanWithId = BookLoan & {
  id: string;
};
