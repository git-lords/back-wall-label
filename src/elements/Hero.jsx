import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ChevRight, ChevLeft } from '../../icons.jsx';
import { Transition } from '@headlessui/react';
import { useTimeoutFn } from 'react-use';



export default function Hero({ heros, currentHero, itemsPerPage }) {

    const [currentPage, setCurrentPage] = useState(0)

    const totalPages = (heros.length - 1)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (currentPage <= 1) {
            setCurrentPage(totalPages)
        }
    }
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (currentPage >= totalPages) {
            setCurrentPage(0)
        }
    }
    useEffect(() => {

        const end = heros.length === 0 ? 1 : totalPages
        const next = currentPage + 1 > end ? 0 : (currentPage + 1)
        const id = setTimeout(() => { setCurrentPage(next) }, 7000)
        return () => { clearTimeout(id); console.log("hit useEffect's return") }
    }, [currentPage])


    return (
        heros[currentPage] &&
        <div className='h-full relative'>
            <div className='h-full w-full text-white flex opacity-0 animate-carousel animate-duration-[6800ms] delay-0 animate-infinite'>
                <div key={heros[currentPage].heroId} className='h-full'>
                    <div className={`w-screen bg-cover bg-center px-2 flex flex-col h-full justify-end`} style={{ backgroundImage: `url(${heros[currentPage].imgUrl})` }}>
                    </div>
                </div>
            </div>
            {/* Page select arrows */}
            <div className="absolute  text-white z-20 flex w-full justify-between px-2 items-end top-1/2">
                <button className='hover:text-darkMint' onClick={previousPage} ><ChevLeft /></button>
                <button className='hover:text-darkMint ' onClick={nextPage}><ChevRight /></button>
            </div>
            <div className='absolute text-white z-20 w-full bottom-1/4 md:bottom-[20%] left-[3%] flex flex-col justify-center items-start'>
                <h1 className='font-bold text-4xl text-shadow-lg shadow-black'>{heros[currentPage].cta}</h1>
            </div>
            <div className='absolute z-20 text-white bottom-[10%] left-[5%] flex rounded-md w-fit border-2 border-solid p-2 shadow-lg shadow-black border-white hover:bg-mint hover:bg-opacity-20'>
                <NavLink className={'mx-4 text-2xl self-center text-shadow-lg shadow-black'} target="_blank" to={heros[currentPage].link}>{heros[currentPage].button}</NavLink>
            </div>
            <div className='absolute z-20 flex w-full justify-center gap-6 items-center bottom-[3%]'>
                {Array.from({ length: totalPages + 1 }).map((_, index) => (
                    <div key={index}>
                        <button className={`heroButton shadow shadow-black rounded-full h-4 w-4 ${index === currentPage ? 'bg-darkMint' : 'bg-zinc-200'}`} onClick={() => paginate(index)}>

                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
