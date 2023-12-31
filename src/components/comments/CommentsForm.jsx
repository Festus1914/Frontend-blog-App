import React, { useState } from 'react'

const CommentsForm = ({ btnLabel, formSubmitHandler }) => {
const [value, setvalue] = useState("")
const submitHandler = (e) => {
    e.preventDefault()
    formSubmitHandler(value)
    setvalue('')
}  
  
    return (
    <form onSubmit={submitHandler}>
        <div className='flex flex-col items-end border border-primary rounded-lg p-4'>
            <textarea className='w-full focus:outline-none'  rows="5" placeholder='Enter your comment here...' 
             value={value}
             onChange={(e) => setvalue(e.target.value)}
           />
           <button type='submit' className='px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2'>{btnLabel}</button>
        </div>
    </form>
  )
}

export default CommentsForm