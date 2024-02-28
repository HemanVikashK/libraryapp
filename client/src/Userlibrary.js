import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import "./library.css";
const Library = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://3.92.26.254:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
    },
    { key: "1", title: "Title", dataIndex: "title" },
    { key: "2", title: "Author", dataIndex: "author" },
    { key: "3", title: "Subject", dataIndex: "subject" },
    { key: "4", title: "Publish Date", dataIndex: "publishdate" }, // Make sure this matches your data exactly
  ];

  // Update the search filter to match your data structure
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div
        className={`box ${darkMode ? "dark-mode" : ""}`}
        style={{
          top: "10%",

          width: "100%",
          left: "0px",
          padding: "20px",
        }}
      >
        <Input
          placeholder="Search Books"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Table columns={columns} dataSource={filteredBooks} rowKey="id" />
        <Button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</Button>
      </div>
    </>
  );
};

export default Library;
