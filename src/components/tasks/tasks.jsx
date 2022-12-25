import "./tasks.css"
import { useState } from "react";




function Tasks({ Tasktilte, Id, send_delete_id, hiu_edit, hiu_save }) {
    const [classid, setClassid] = useState("is")


    function editHandler() {

        hiu_edit(Id)
        hiu_save(Id)
    }


    function checkedHandler(event) {
        classid === "done" ?
            setClassid("is") :
            setClassid("done")

    }

    function deleteHandler() {
            send_delete_id(Id)
    }

    return (

        <div className="fulltask">
            <div className="taskcontainer">
                <input onChange={checkedHandler} type='checkbox' ></input>
                <h2>{Id}-</h2>
                <h2 className={classid}> {Tasktilte}</h2>
            </div>
            <div className="buttons">
                <button onClick={deleteHandler} className="deletebtn">Delete</button>
                <button className="editbtn" onClick={editHandler}>Edit</button>
                            </div>
        </div>
    )
}
export default Tasks;