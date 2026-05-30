import React, { useEffect, useState } from 'react'


const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [task, setTask] = useState(() => {
    const savedTask = localStorage.getItem('notes')

    return savedTask ? JSON.parse(savedTask) : []
  })

  const [editIndex, setEditIndex] = useState(null)

  const [search, setSearch] = useState('')

  const filteredTasks = task.filter((elem) => {
    return elem.title
      .toLowerCase()
      .includes(search.toLowerCase())
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(task))
  }, [task])



  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  const submitHandler = (e) => {
    e.preventDefault()

    if (!title || !details) {
      return
    }
    const copyTask = [...task]
    if (editIndex !== null) {
      copyTask[editIndex] = {
        title,
        details,
        date: task[editIndex].date
      }
      setTask(copyTask)
      setEditIndex(null)
    } else {
      copyTask.push({
        title,
        details,
        date: new Date().toLocaleString()
      })
      setTask(copyTask)
    }

    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1)

    setTask(copyTask)

  }

  return (
    <div
      className={`flex flex-col md:flex-row gap-5 min-h-screen transition-all duration-300 ${theme === "dark"
        ? "text-white"
        : "bg-gray-100 text-black"
        }`}
    >
      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='w-full md:w-1/2'  >
        <div className='flex flex-col  gap-5 p-5 md:p-10'>

          <h1 className={`font-bold text-3xl md:text-5xl ${theme === "dark" ? "text-white" : "text-black"
            }`}>Add Notes</h1>

          <input value={title} onChange={(e) => {
            setTitle(e.target.value)
          }} className={`px-5 py-4 border-2 rounded outline-none font-medium text-lg ${theme === "dark"
            ? "text-white border-white"
            : "text-black border-gray-400 bg-white"
            }`} type="text" placeholder='Enter Notes Heading' />

          <textarea value={details} onChange={(e) => {
            setDetails(e.target.value)
          }} maxLength={200} className={` px-5 py-4 h-40 border-2 outline-none rounded font-medium text-lg maxLength={200} ${theme === "dark"
            ? "text-white border-white"
            : "text-black border-gray-400 bg-white"
            }`} placeholder='Write details' name="" id=""></textarea>
          <p className='text-gray-400 text-right'>
            {details.length}/200
          </p>
          <button className={` cursor-pointer active:scale-95  px-5 py-4 rounded font-medium text-lg ${theme === "dark"
              ? "text-black bg-white"
              : "text-white  bg-black"
            }`}>{editIndex !== null ? "Update Note" : "Add Note"}</button>
        </div>

      </form>

      <div className='flex flex-col gap-5 w-full md:w-1/2 border-t-2 md:border-t-0  md:border-l-2  h-screen pl-5 md:pl-10 p-5 md:p-10'>
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-3xl font-semibold cursor-pointer text-sm"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        <h1 className={`font-bold text-3xl md:text-5xl ${theme === "dark" ? "text-white" : "text-black"
          }`}>Recent Notes</h1>
        <input value={search} onChange={(e) => {
          setSearch(e.target.value)
        }} className={`border-2 px-3 py-3 w-full md:w-100 rounded outline-none font-medium ${theme === "dark"
          ? "text-white border-white"
          : "text-black border-gray-400 bg-white"
          }`} type="text" placeholder='Search Note' />
        <div className='flex gap-5 overflow-auto flex-wrap justify-center md:justify-start custom-scrollbar'>

          {filteredTasks.length === 0 && (
            <h2 className='text-xl text-gray-400'>No Notes Found</h2>
          )}


          {filteredTasks.map(function (elem, idx) {

            return <div key={idx} className="relative h-60 w-50 text-shadow-black flex  flex-col justify-between py-6 px-4 rounded-2xl bg-cover text-black bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] ">

              <span onClick={() => {
                setTitle(elem.title)
                setDetails(elem.details)
                setEditIndex(idx)
              }} className='absolute top-6 right-4 cursor-pointer text-lg active:scale-95'>✏️</span>

              <div>
                <h2 className='font-bold text-xl  w-fit '>{elem.title}  </h2>
                <p className=' mt-4 text-gray-700'>{elem.details}</p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xs text-gray-600'>{elem.date}</p>


                <button onClick={() => {
                  deleteNote(idx)
                }} className='bg-red-500 cursor-pointer active:scale-95 font-bold px-4 py-1 text-white rounded text-sm  '>Delete</button>
              </div>
            </div>
          })}
        </div>

      </div>
    </div>
  )
}

export default App
