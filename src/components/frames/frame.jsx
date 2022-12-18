import "./frame.css";
import Tasks from "../tasks/tasks";
import { useState, useRef, useEffect } from "react";

function Frame() {
  const [input, setInput] = useState();
  const [taskarray, setTaskarray] = useState(() => {
    const taskarray = localStorage.getItem("taskarray");
    const initialValue = JSON.parse(taskarray);
    return initialValue || "";
  });
  const inputRef = useRef();
  const [suborsave, setsuborsave] = useState("submit")
  const [editid, setEditid] = useState()
  const [newValue, setNewValue] = useState()

  useEffect(() => {
    localStorage.setItem('taskarray', JSON.stringify(taskarray))
  }, [taskarray])



  //-----------------Delete----------------

  function deleteHandler(id) {
    setTaskarray(taskarray.filter((task) => task.id != id));

  }
  //-----------------input----------------
  function inputHandler(event) {
    setInput(() => event.target.value);
    setNewValue(() => event.target.value)
  }
  //--------------------submit----------------
  function submitHandler() {
    if (input == "") {
      alert("please write a task")
    } else {
      if (suborsave === "submit") {
        if (taskarray.some((obj) => obj.tasktilte === input)) {
          alert("task exists");
          return;
        }


        const sum = taskarray.length + 1;
        setTaskarray([
          ...taskarray,
          (taskarray.tasktilte = { id: sum, tasktilte: input }),
        ]);
        setInput("");
        inputRef.current.focus();
      }
      else {
        setsuborsave("submit")
        saveHandler()
        setInput("");
        inputRef.current.focus();
      }
    }
  }
  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      submitHandler();
    }
  }

  //--------------------edit----------------

  function editHandler(id) {
    if (input === "") {
      const editinput = taskarray[id - 1].tasktilte
      setInput(editinput)
      setEditid(id)
      inputRef.current.focus();

      setsuborsave("save");
    } else {
      alert("finish editing")
    }
  }

  function saveHandler() {
    const newTaskArray = taskarray.map((item) => {
      if (item.id == editid) {
        return {
          id: editid,
          tasktilte: newValue
        }
      }
      else {
        return item
      }
    })
    setTaskarray(newTaskArray)

  }


  return (
    <div className="frame">
      <div className="tasksection">
        {taskarray.map((taskarray) => {
          return (
            <Tasks
              Taskdelete={taskarray}
              Tasktilte={taskarray.tasktilte}
              Id={taskarray.id}
              hiu_delete={deleteHandler}
              hiu_edit={editHandler}
              hiu_save={saveHandler}
            />
          );
        })}
      </div>
      <div className="addsection">
        <input
          id="taskInput"
          onKeyUp={handleKeyUp}
          value={input}
          onChange={inputHandler}
          className="addtask"
          ref={inputRef}
          placeholder="Add your tasks"
        ></input>
        <button type="submit" onClick={submitHandler} className="sbutton">
          {suborsave}
        </button>
      </div>
    </div>
  );
}
export default Frame;
