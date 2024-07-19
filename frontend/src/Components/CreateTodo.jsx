import { useState } from "react";

export const CreateToDo = () => {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");

  return (
    <>
      <h1>Add your ToDo</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="button"
        value="Add ToDo"
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({
              title,
              description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(() => console.log("Added Succesfully"))
            .catch((err) => console.error(err));
        }}
      />
    </>
  );
};
