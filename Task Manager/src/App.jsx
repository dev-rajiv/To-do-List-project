import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar' 
import { v4 as uuidv4 } from 'uuid'; // for creating unique IDs
import { FaRegEdit } from "react-icons/fa"; // library for edit icon in React
import { MdDeleteOutline } from "react-icons/md"; // library for delete icon in React


function App() {
  
  // State to manage input for new tasks
  const [newTask, setnewTask] = useState("")

  // State to manage tasks
  const [tasks, setTasks] = useState([])

  // State to manage and show finished task
  const[showFinished, setshowFinished] = useState(true)
  
  // Hook allows to perform side effects in our components like fetching data, DOM etc
  useEffect(() => {
    let newTaskString = localStorage.getItem("tasks")
    if(newTaskString){
   let tasks = JSON.parse(localStorage.getItem("tasks"))
   setTasks(tasks)
    }
  }, [])

  // Function for storing layout in local storage 
  const saveToLS = (params) => { 
    localStorage.setItem("tasks", JSON.stringify(tasks))
    
  }

   // Function to toggle completion status of a task
  const toggleFinished =(e) => {
    setshowFinished(!showFinished)
  }
  
// Function to add a new task
  const handleAdd = () => {
    setTasks([...tasks, {id: uuidv4(), newTask, isCompleted: false}]) //Add new task to the tasks array with unique ID and not completed
    setnewTask("")
    console.log(tasks)
    saveToLS() // statement to save the task in local storage
  } 

  // Function to edit and update a task
  const handleEdit = (e, id) => {
    let t = tasks.filter(i=>i.id === id)
    setnewTask(t[0].newTask)
    let newTasks = tasks.filter(item =>{
      return item.id!== id;
    } );
    setTasks(newTasks)
    saveToLS()
  }

// Function to delete a task
const handleDelete = (e, id) => {
  let newTasks = tasks.filter(item =>{
  return item.id!== id;
  } );
  setTasks(newTasks)
  saveToLS() 
  }

  const handleChange = (e) => {
    setnewTask(e.target.value)
  }

// Function to handle a checkbox task
const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = tasks.findIndex(item=>{
      return item.id === id;
      
    })
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks)
    saveToLS() 
  }
 
  return (
    <>
    <Navbar/>
      <div className="md:container md:mx-auto mx-3 my-6 rounded-md p-5 bg-zinc-200 min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl ">TodoMatric - Manage your tasks at one place</h1>
        <br/>
        <h2 className="text-lg font-bold text-left gap-5">Add a Task</h2>
        <div className="addnewTask my-2 flex flex-wrap gap-4 justify-center">
          <input onChange={handleChange} value={newTask} type="text" className="w-full rounded-md p-1 " placeholder="Add a task"></input>

          {/* create a button to save a task*/}
          <button onClick= {handleAdd} disabled={newTask.length<=2} className="bg-gray-600 hover:bg-gray-800 text-white rounded-md text-sm font-bold px-3 py-1 mx-4"> Save </button>
        </div>

        {/* create a checkbox to show the finished task*/}
       <input className="my-4" id="show" onChange={toggleFinished} type="checkbox" checked={showFinished}/> 
       <label className="mx-2" htmlFor="show">Show Finished</label>
       <div className ="h-[1px] bg-black opacity-25 w-90 mx-auto my-2"></div>
       <h2 className="text-lg font-bold text-left"> Your Saved Tasks : </h2>
       <br/>
       <div className="Tasks">
        {tasks.length ===0 && <div className="m-4"> No Tasks to display! </div> }

       { /* Map through tasks and toggle completion status of the clicked task */}
        {tasks.map(item=>{
        return (showFinished || !item.isCompleted) && <div key={item.id} className="newTask flex my-3 justify-between">
          <div className="flex gap-4">

            {/* create a checkbox to check a task*/}
          <input name={item.id} onClick={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""></input>
          <div className={item.isCompleted?"line-through":""}>{item.newTask}</div>
          </div>
          <div className="buttons flex h-full">
            
            {/* create a button to edit a task*/}
          <button onClick={(e) =>{handleEdit(e, item.id)}} className="bg-gray-600 hover:bg-gray-800 text-white rounded-md text-sm font-bold px-3 py-1 mx-4"><FaRegEdit /></button>

            {/* create a button to delete a task*/}
          <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-gray-600 hover:bg-gray-800 text-white rounded-md text-sm font-bold px-3 py-1 mx-4" ><MdDeleteOutline /></button>
          </div>
        </div>
        })}
       </div>
          </div>
    </>
  ) 
}

export default App
