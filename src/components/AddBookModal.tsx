import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DropdownOption } from "./Dropdown";
import { dropdownOptions } from "../utils/common";
import { Book } from "../types/models.types";
import { addBook } from "../server/books";

// range through dropdownOptions and create a map from value to DropdownOption
const myMap = new Map<string, DropdownOption>();
dropdownOptions.forEach((option) => {
  if (option.value === "All") {
    return;
  }
  myMap.set(option.value, option);
});

const AddBookModal = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(item)) {
      const index = updatedSelectedItems.indexOf(item);
      updatedSelectedItems.splice(index, 1);
    } else {
      updatedSelectedItems.push(item);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleImageSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file.name);
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const addNewBook = async () => {
    const book: Book = {
      title: title,
      author: author,
      description: description,
      tags: selectedItems,
      image_url: "",
      user_id: "",
    };
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }
    setTitle("");
    setAuthor("");
    setDescription("");
    setSelectedItems([]);
    setSelectedImage(null);
    await addBook(book, selectedImage);
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Add Book
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {selectedImage && (
              <button
                className="btn px-0 pt-0"
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                }}
              >
                <AiOutlineCloseCircle />
              </button>
            )}
          </div>
          <div className="form-group mt-2">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label>Author:</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label>Add Tags:</label>
            <div className="dropdown mb-2">
              <button
                className="btn btn-primary dropdown-toggle mt-1"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select Options
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {dropdownOptions.map(
                  (item) =>
                    item &&
                    item.value !== "All" && (
                      <label className="dropdown-item" key={item.value}>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.value)}
                          onChange={() => toggleItem(item.value)}
                        />
                        <p className="mx-1">{item.label}</p>
                      </label>
                    )
                )}
              </div>
            </div>
            <p className="mt-1">
              Selected Tags:{" "}
              {selectedItems.map((item) => (
                <span key={item} className="badge rounded-pill text-bg-primary">
                  {myMap.get(item)?.label}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              title === "" ||
              description === "" ||
              selectedImage === null ||
              author === ""
            }
            data-bs-dismiss="modal"
            onClick={addNewBook}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
