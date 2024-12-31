import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";

function App() {

  // to store data on local Storage
  // const saveToLocal = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInputValue(e);  
   
    
    
  };
 
  const handleAdd = () => {

   
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodos([...todos, { id: uuidv4(), inputValue, isCompleted: false }]);
   
    localStorage.setItem("todos", JSON.stringify(todos));
    setInputValue("");
  
  };

  const handleEdit = (e, id) => {
    let value = todos.filter(i => i.id === id);
    setInputValue(value[0].inputValue)
    let newTodos = todos.filter(items => {
      return items.id !== id
    })
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    // saveToLocal(); //to store data on local Storage
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(items => {
      return items.id !== id
    })
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    // saveToLocal(); //to store data on local Storage
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    // saveToLocal(); //to store data on local Storage
  };

  const handleDeleteAll = () => {
    console.log("all delete");
    setTodos([]);
    localStorage.setItem("todos", JSON.stringify([]));
    // saveToLocal(); //to store data on local Storage
  }

  // console.log(todos);
  return (
    <div className="w-full">
      <Navbar />

      <div className="container sm:min-w-[500px] min-w-[400px] mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">

        <div className=" w-full">
          <h2 className="text-2xl   font-mono text-center text-slate-800 opacity-80 font-[600] mb-6">Manage your task at one place</h2>
          <h2 className="text-xl font-bold">Add todo</h2>

          <div className="flex justify-evenly items-center">
            <input
              type="text"
              spellCheck="false"
              onChange={(e) => handleChange(e.target.value)}
              value={inputValue}
              className="w-1/2 outline-none  my-4 p-2 rounded-md"
            />
            <button
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-6 font-bold text-sm disabled:bg-slate-700"
              onClick={handleAdd}
              disabled={inputValue.length <= 3}
            >
              Add
            </button>
            <button className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-3 font-bold text-sm " onClick={handleDeleteAll}><FcDeleteDatabase className="text-xl" /></button>
          </div>
        </div>

<hr className="h-[1px] bg-black  w-[70%] mx-auto my-4 opacity-35" />
        <h2 className="text-xl font-bold ">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Task to display</div>}
          {todos.map((item) => {
            return (
              <div className="todo flex w-[100%] md:w-[75%] my-3 justify-between text-slate-700 text-lg font-[500] font-mono">
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    onChange={handleCheckBox}
                  />
                  <div
                    key={item.id}
                    className={item.isCompleted ? "line-through" : ""}
                  >
                    {item.inputValue}
                  </div>
                </div>

                <div className="btn flex h-full">
                  <button
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-3 font-bold text-sm "
                    onClick={(e) => handleEdit(e, item.id)}
                  >
                    <FaEdit className="text-lg" />

                  </button>
                  <button
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-3 font-bold text-sm "
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <MdDeleteForever className="text-lg" />
                  </button>
                </div>


              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
