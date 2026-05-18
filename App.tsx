import type { Book } from "@/types/book";
import { bookData } from "@/data/bookData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookDetail from "@/BookDetail";
import BookList from "@/BookList";
import useLocalStorage from "@/hooks/useLocalStorage";

const App = () => {
  const [books, setBooks] = useLocalStorage<Book[]>("books", bookData);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList books={books} />} />
        <Route path="/books/:id" element={<BookDetail books={books} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
