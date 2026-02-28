export const fetchBooks = {
  Book: "books",
  Books_Detail: "bookDetail",
  Books_Recommended: "booksRecommended",
};

export const endPoints = {
  Book: "/api/books",
  Books_Detail: (id: number) => `/api/books/${id}`,
  Books_Recommended: "/api/books/recommended",
};