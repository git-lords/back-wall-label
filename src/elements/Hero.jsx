import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ChevRight, ChevLeft } from '../../icons.jsx';


export default function Hero({ heros, currentHero, itemsPerPage }) {
    const [paused, setPaused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(heros.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = heros.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if(currentPage <= 1){
            setCurrentPage(totalPages)
        }
    }
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if(currentPage >= totalPages){
            setCurrentPage(1)
        }
    }

    return (
        <div className='h-[70vh] w-full text-white flex'>
            {currentItems.map((hero) => (
                <div key={hero.heroId} >
                    {/* {console.log(hero)} */}
                    <div className={`w-screen bg-cover bg-center px-2 flex flex-col`} style={{ backgroundImage: `url(${hero.imgUrl})`, height: "90vh" }}>
                        {/* <div className={`bg-cover w-screen h-96 bg-center bg-[url('${hero.imgUrl}')]`} > */}
                        {/* <img src={hero.imgUrl} alt="background image" className='w-full'/> */}

                        {/* Page select arrows */}
                        <div className="flex w-full justify-between px-2 h-1/2 items-end ">
                            <button className='hover:text-darkMint' onClick={previousPage} ><ChevLeft /></button>
                            <button className='hover:text-darkMint' onClick={nextPage}><ChevRight /></button>
                        </div>

                        <div className='h-[40%] flex flex-col p-4 justify-end gap-6 ml-10 items-start'>
                            <h1 className='font-bold text-4xl text-shadow-lg shadow-black'>{hero.cta}</h1>
                            <div className='flex rounded-md w-fit border-2 border-solid p-2 shadow-lg shadow-black border-white hover:bg-mint hover:bg-opacity-20'>
                                <NavLink className={'mx-4 text-2xl self-center text-shadow-lg shadow-black'} target="_blank" to={hero.link}>{hero.button}</NavLink>
                            </div>
                        </div>

                        <div className='h-[10%] flex justify-center gap-6 items-center'>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <div key={index}>
                                    <button className={`shadow-xl shadow-black rounded-full bg-zinc-200 h-4 w-4 ${index + 1 === currentPage ? 'text-mint' : ''}`} onClick={() => paginate(index + 1)}>
                                        
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
