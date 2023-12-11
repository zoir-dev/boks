import { useEffect, useState } from "react";
import "./style.css";
import Book from "./Book";
import "./style.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import CryptoJS from "crypto-js";
import axios from "axios";
import BooksModal from "./BooksModal";

const Books = ({ open, setOpen, books, setBooks, search }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Add");
  const fetchBooks = async () => {
    const userData = localStorage.getItem("data");
    const dataa = JSON.parse(userData);
    const res = "GET" + `/books${search ? `/${search}` : ""}` + dataa?.secret;
    const token = CryptoJS.MD5(res).toString();
    setLoading(true);
    await axios
      .get(`https://0001.uz/books${search ? `/${search}` : ""}`, {
        headers: {
          "Content-Type": "application/json",
          Key: dataa?.key || "",
          Sign: token,
        },
      })
      .then((d) => setBooks(d.data.data === null ? [] : d.data.data))
      .catch((e) => console.log(e));
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className={loading || !books.length ? "" : "books"}>
      {loading ? (
        <Box
          display="flex"
          height="50vh"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <CircularProgress />
        </Box>
      ) : books.length === 0 ? (
        <Typography
          fontSize="39px"
          fontWeight="600"
          textAlign="center"
          color="#6200EE"
        >
          No books
        </Typography>
      ) : (
        books.map((b) => (
          <Book
            b={b ? b : ""}
            setBooks={setBooks}
            key={b?.id}
            setType={setType}
            setModal={setOpen}
          />
        ))
      )}
      <BooksModal
        open={open}
        setOpen={setOpen}
        fetchBooks={fetchBooks}
        type={type}
        setType={setType}
      />
    </div>
  );
};

export default Books;
