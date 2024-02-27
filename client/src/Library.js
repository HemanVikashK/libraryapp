import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button } from "antd";
import "./library.css";
const Library = () => {
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://libraryapp-kappa.vercel.app/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddBook = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const url = selectedBook
          ? `https://libraryapp-kappa.vercel.app/books/${selectedBook.id}` // If editing
          : "https://libraryapp-kappa.vercel.app/books"; // If adding
        const method = selectedBook ? "PUT" : "POST";

        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => {
            if (method === "POST") {
              setBooks([...books, data]);
            } else {
              setBooks(
                books.map((book) => (book.id === data.id ? data : book))
              );
            }
            setIsModalVisible(false);
            form.resetFields();
            setSelectedBook(null); // Reset selected book
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((errorInfo) => console.log("Failed:", errorInfo));
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    fetch(`https://libraryapp-kappa.vercel.app/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Filter out the deleted book
          setBooks(books.filter((book) => book.id !== id));
        } else {
          throw new Error("Failed to delete the book.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const columns = [
    {
      key: "1",
      title: "id",
      dataIndex: "id",
    },
    { key: "1", title: "Title", dataIndex: "title" },
    { key: "2", title: "Author", dataIndex: "author" },
    { key: "3", title: "Subject", dataIndex: "subject" },
    { key: "4", title: "Publish Date", dataIndex: "publishdate" },
    {
      key: "5",
      title: "Edit",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        </div>
      ),
    },
    {
      key: "6",
      title: "Delete",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedBook(record);
    form.setFieldsValue({
      title: record.title,
      author: record.author,
      subject: record.subject,
      publishdate: record.publishdate,
    });
    setIsModalVisible(true);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className={`bigbox ${darkMode ? "dark-mode" : ""}`}>
        <div
          className={`box ${darkMode ? "dark-mode" : ""}`}
          style={{
            top: "10%",
            margin: "auto",
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
          <Table
            className={darkMode ? "dark-table" : ""}
            columns={columns}
            dataSource={filteredBooks}
            rowKey="id"
          ></Table>
          <Modal
            title="Add Book"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: "Please enter author" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Please enter subject" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Publish Date"
                name="publishdate"
                rules={[
                  { required: true, message: "Please enter publish date" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Button onClick={handleAddBook}>Add Book</Button>
          <Button onClick={() => setDarkMode(!darkMode)}>
            Toggle Dark Mode
          </Button>
        </div>
      </div>
    </>
  );
};

export default Library;
