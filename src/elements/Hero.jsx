import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ChevRight, ChevLeft } from '../../icons.jsx';


export default function Hero({ heros, currentHero, itemsPerPage }) {
    const [paused, setPaused] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    const totalPages = (heros.length -1)
    // const indexOfLastItem = currentPage * itemsPerPage
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage
    // const currentItems = heros.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if(currentPage <= 1){
            setCurrentPage(totalPages)
        }
    }
    const nextPage = () => {
        
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if(currentPage >= totalPages){
            setCurrentPage(0)
        }
    }
    useEffect(()=> {
        const end = heros.length === 0 ? 1 : totalPages
        const next = currentPage+1 > end ? 0 : (currentPage + 1) 
        const id = setTimeout(()=> setCurrentPage(next),7000)
        return () => clearTimeout(id)}, [currentPage])


    return (
        heros[currentPage] && <div className='h-[70vh] w-full text-white flex '>
            
                <div key={heros[currentPage].heroId} >
                    
                    <div className={`w-screen bg-cover bg-center px-2 flex flex-col`} style={{ backgroundImage: `url(${heros[currentPage].imgUrl})`, height: "90vh" }}>
                        
                        {/* Page select arrows */}
                        <div className="flex w-full justify-between px-2 h-1/2 items-end ">
                            <button className='hover:text-darkMint' onClick={previousPage} ><ChevLeft /></button>
                            <button className='hover:text-darkMint' onClick={nextPage}><ChevRight /></button>
                        </div>

                        <div className='h-[40%] flex flex-col p-4 justify-end gap-6 ml-10 items-start'>
                            <h1 className='font-bold text-4xl text-shadow-lg shadow-black'>{heros[currentPage].cta}</h1>
                            <div className='flex rounded-md w-fit border-2 border-solid p-2 shadow-lg shadow-black border-white hover:bg-mint hover:bg-opacity-20'>
                                <NavLink className={'mx-4 text-2xl self-center text-shadow-lg shadow-black'} target="_blank" to={heros[currentPage].link}>{heros[currentPage].button}</NavLink>
                            </div>
                        </div>

                        <div className='h-[10%] flex justify-center gap-6 items-center'>
                            {Array.from({ length: totalPages + 1 }).map((_, index) => (
                                <div key={index}>
                                    <button className={`shadow-xl shadow-black rounded-full bg-zinc-200 h-4 w-4 ${index + 1 === currentPage ? 'text-mint' : ''}`} onClick={() => paginate(index + 1)}>
                                        
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            
        </div>
    )
}
