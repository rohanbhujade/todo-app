import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar'
const App = () => {
  const [todo, settodo] = useState("")
const [todos, settodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
});

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  const [editIndex, seteditIndex] = useState(null)
  const handleedit=(index)=>{
    settodo(todos[index].todo)
      seteditIndex(index);

  }
   const handleadd=()=>{
      if (!todo.trim()) return;
    settodos([...todos,{todo,iscompleted:false}])
    settodo("")
    if (editIndex !== null) {
  const copy = [...todos];
  copy[editIndex].todo = todo;
  settodos(copy);
  seteditIndex(null);
  settodo("");
}
    console.log(todos);
    
  }
   const handledelete=(index)=>{
    let copy=[...todos]
    copy.splice(index,1)
    settodos(copy)
  }
  const togglecomplete=(index)=>{
    const copy=[...todos]
    copy[index].iscompleted=!copy[index].iscompleted
    settodos(copy)
  }
  return (
    <>
    <Navbar/>
    <div className='mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] w-11/12'>
      <div className='addtodo my-5'>
        <h2  className='text-lg font-bold '>Add a Todo</h2>
        <input onChange={(e)=>settodo(e.target.value)} value={todo} className='w-1/2 bg-white text-black' type="text" />
        <button onClick={handleadd}  className='bg-violet-800 hover:bg-violet-950 px-2 font-bold text-sm py-1 text-white rounded-md cursor-pointer mx-6'>Add</button>
      </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
         {todos.map((item,index)=>{
          
          return  <div key={index} className="todo flex justify-between w-1/2 my-3">
            <input type="checkbox" onChange={()=>togglecomplete(index)} checked={item.iscompleted} name="" id="" />
            <div className={item.iscompleted?"line-through ":""}>{item.todo}</div>
            <div className="buttons">
            <button onClick={()=>handleedit(index)} className='bg-violet-800 hover:bg-violet-950 px-2 font-bold text-sm py-1 text-white rounded-md cursor-pointer mx-1'>Edit</button>
            <button onClick={()=>handledelete(index)} className='bg-violet-800 hover:bg-violet-950 px-2 font-bold text-sm py-1 text-white rounded-md cursor-pointer mx-1'>Delete</button>
            </div>
          </div>
         })}
        </div>
        
    </div>
    </>
  )
}

export default App