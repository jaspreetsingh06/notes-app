import React, { useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()


    const copyTask = [...task]
    copyTask.push({ title, details })

    setTask(copyTask)

    setTitle('')
    setDetails('')
  }

  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1)

    setTask(copyTask)



  }

  return (
    <div className='flex  gap-5  text-white h-screen'>
      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='w-1/2'  >
        <div className='flex flex-col  gap-5  pr-5 p-10'>

          <h1 className='text-white font-bold text-5xl'>Add Notes</h1>

          <input value={title} onChange={(e) => {
            setTitle(e.target.value)
          }} className='text-white px-5 py-4 border-2 outline-none rounded font-medium text-lg' type="text" placeholder='Enter Notes Heading' />

          <textarea value={details} onChange={(e) => {
            setDetails(e.target.value)
          }} className='text-white px-5 py-4 h-40 border-2 outline-none rounded font-medium text-lg ' placeholder='Write details' name="" id=""></textarea>
          <button className='text-black bg-white cursor-pointer active:scale-95  px-5 py-4 rounded font-medium text-lg'>Add Note</button>
        </div>


      </form>
      <div className='flex flex-col gap-5 w-1/2 border-l-2  h-screen pl-10 p-10'>
        <h1 className='text-white font-bold text-5xl'>Recent Notes</h1>
        <div className='flex gap-5 overflow-auto flex-wrap'>
          {task.map(function (elem, idx) {

            return <div key={idx} className="h-60 w-50 text-shadow-black flex  flex-col justify-between py-6 px-4 rounded-2xl bg-cover text-black bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] ">
              <div>
                <h2 className='font-bold text-xl  w-fit'>{elem.title}</h2>
                <p className=' mt-4 text-gray-500'>{elem.details}</p>
              </div>

              <button onClick={() => {
                deleteNote(idx)
              }} className='bg-red-500 cursor-pointer active:scale-95 font-bold px-4 py-1 text-white rounded text-sm  '>Delete</button>
            </div>
          })}





        </div>

      </div>
    </div>
  )
}

export default App
