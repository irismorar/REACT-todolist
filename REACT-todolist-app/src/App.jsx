import "./App.css";
import { useState } from "react";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [toDos, setToDos] = useState([]);
  const [filter, setFilter] = useState("all"); //"active" , "completed"

  const filteredToDos = toDos.filter((toDo) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "active") {
      return !toDo.completed;
    }
    if (filter === "completed") {
      return toDo.completed;
    }
  });

  return (
    <section className="app_container">
      <header>
        <h1>todos</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={userInput}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              const newState = [
                ...toDos,
                { id: Date.now(), name: userInput, completed: false },
              ];
              setToDos(newState);
              setUserInput("");
            }
          }}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        />
      </header>
      <main className="main">
        <ul>
          {filteredToDos.map((toDo) => {
            return (
              <li key={toDo.id}>
                <div className="checkbox_text_container">
                  <input
                    type="checkbox"
                    checked={toDo.completed}
                    onChange={() => {
                      const updatedToDos = toDos.map((item) =>
                        item.id === toDo.id
                          ? { ...item, completed: !item.completed }
                          : item
                      );
                      setToDos(updatedToDos);
                    }}
                  />
                  <label
                    style={{
                      textDecoration: toDo.completed ? "line-through" : "none",
                      opacity: toDo.completed ? ".7" : "1",
                    }}
                  >
                    {toDo.name}
                  </label>
                </div>
                <button
                  className="delete_toDo_button"
                  onClick={() => {
                    const afterDeletingToDos = toDos.filter(
                      (item) => item.id !== toDo.id
                    );
                    setToDos(afterDeletingToDos);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {toDos.length && (
          <footer className="footer_container">
            <div className="items_left_container">
              {toDos.length}
              {toDos.length <= 1 ? " item" : " items"} left!
            </div>
            <div className="filters_container">
              <button
                className="filter_button"
                onClick={() => {
                  setFilter("all");
                }}
              >
                All
              </button>
              <button
                className="filter_button"
                onClick={() => {
                  setFilter("active");
                }}
              >
                Active
              </button>
              <button
                className="filter_button"
                onClick={() => {
                  setFilter("completed");
                }}
              >
                Completed
              </button>
            </div>
            <div className="clear_completed_container">
              <button
                className="clear_completed_button"
                onClick={() => {
                  setToDos(toDos.filter((toDo) => !toDo.completed));
                }}
              >
                Clear completed
              </button>
            </div>
          </footer>
        )}
      </main>
    </section>
  );
}
