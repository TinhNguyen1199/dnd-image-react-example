import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    },
    {
      id: 2,
      src: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
    {
      id: 3,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-DPcd5duxTJDLfrIfB3WrxciLvqjq7PiUL0C06fAt6gY8jhXFyoDSc8T8cw&s",
    },
  ]);

  const [columns, setColumns] = useState({
    left: [],
    right: [],
  });

  useEffect(() => {
    setColumns((pre) => ({ ...pre, left: [...images] }));
  }, [images]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("imageId", id);
    const rightColumn = document.querySelector(".right-column");
    rightColumn.style.border = "2px dashed blue";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, column) => {
    const imageId = e.dataTransfer.getData("imageId");
    const image = images.find((img) => img.id.toString() === imageId);

    if (column === "left") {
      e.preventDefault();
      return;
    }

    // Check if the image is already in the right column
    if (columns.right.find((img) => img.id === image.id)) {
      e.preventDefault();
      return;
    }

    const updatedColumns = { ...columns };
    updatedColumns[column] = [...updatedColumns[column], image];
    setColumns(updatedColumns);
  };

  const handleDelete = (id) => {
    const updatedImagesColumn = columns?.right.filter(
      (image) => image.id !== id
    );
    setColumns((pre) => ({ ...pre, right: updatedImagesColumn }));
  };

  const handleDragEnd = () => {
    const rightColumn = document.querySelector(".right-column");
    rightColumn.style.border = "";
  };

  return (
    <div className="App">
      <div
        className="column left-column"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, "left")}
      >
        <h2>Left Column</h2>
        {columns.left.map((image) => (
          <div key={image.id} className="image-container">
            {/* <button
              className="delete-button"
              onClick={() => handleDelete(image.id)}
            >
              X
            </button> */}
            <img
              src={image.src}
              alt="drag"
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragEnd={handleDragEnd}
            />
          </div>
        ))}
      </div>
      <div
        className="column right-column"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, "right")}
      >
        <h2>Right Column</h2>
        {columns.right.map((image) => (
          <div key={image.id} className="image-container">
            <button
              className="delete-button"
              onClick={() => handleDelete(image.id)}
            >
              X
            </button>
            <img
              src={image.src}
              alt="drag"
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
