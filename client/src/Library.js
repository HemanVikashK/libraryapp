import React, { useState, useEffect } from "react";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books") // Assuming your API endpoint for fetching books is '/books'
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "publishDate", headerName: "Publish Date", width: 300 },
  ];

  return (
    <div className="box" style={{ height: 800, width: "80%" }}>
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default Library;
