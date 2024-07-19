import { useEffect, useState } from "react";

export const ToDo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  const handleCheckboxChange = (id, currentStatus) => {
    const newStatus = !currentStatus;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo._id === id ? { ...todo, isCompleted: newStatus } : todo
      )
    );

    fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, isCompleted: newStatus }),
    })
      .catch(err => {
        console.error('Error updating the todo:', err);
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? { ...todo, isCompleted: !newStatus } : todo
          )
        );
      });
  };

  return (
    <div>
      {todos.map((item) => (
        <div key={item._id}>
          <p>Title : {item.title}</p>
          <p>Description : {item.description}</p>
          <p>
            Status: {item.isCompleted ? "Completed" : "Mark as Complete"}
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => handleCheckboxChange(item._id, item.isCompleted)}
            />
          </p>
        </div>
      ))}
    </div>
  );
};
