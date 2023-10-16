
import React from 'react'

export const AdminHeroForm = () => {
  return (
    <div className='w-fit h-fit rounded-sm border-2 p-2 flex flex-col dark:bg-zinc-700'>
        <details title='Create a Hero'>
            <summary>Create a Hero</summary>
            <form className='flex flex-col'>
                <label htmlFor="img">Image URL: </label>
                <input className='bg-zinc-600' type="text" />
                <label htmlFor="title">Title: </label>
                <input className='bg-zinc-600' type="text" />
                <label htmlFor="button text">Button Text: </label>
                <input className='bg-zinc-600' type="text" />
                <label htmlFor="button link">Button Link: </label>
                <input className='bg-zinc-600' type="text" />
                <button onClick={()=>{console.log("submit")}}>Submit</button>
            </form>
        </details>
    </div>
  )
}
