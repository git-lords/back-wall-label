import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ChevRight, ChevLeft } from '../../icons.jsx';
import { Transition } from '@headlessui/react';
import { useTimeoutFn } from 'react-use';



export default function Hero({ heros, currentHero, itemsPerPage }) {
    
    const [currentPage, setCurrentPage] = useState(0)
    const [show, setShow] = useState(false)
    let [, , resetIsShowing] = useTimeoutFn(() => setShow(false), 7200)

    const totalPages = (heros.length -1)
    
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
        const id = setTimeout(()=> {setCurrentPage(next)},8000)
        return () => {setShow(true),clearTimeout(id), resetIsShowing()}}, [currentPage])


    return (
        heros[currentPage] && 
        <Transition
            className={'h-full '}
            appear={currentPage}
            show={show}
            enter="transition ease-out duration-500 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0 "
            leave="transition ease-in delay-200 duration-500 transform"
            leaveFrom=" translate-x-0"
            leaveTo="-translate-x-full"
            >
            <div className='h-full w-full text-white flex '>
                <div key={heros[currentPage].heroId} className='h-full'>
                    
                    <div className={`w-screen bg-cover bg-center px-2 flex flex-col h-full`} style={{ backgroundImage: `url(${heros[currentPage].imgUrl})` }}>
                        
                        {/* Page select arrows */}
                        <div className="flex w-full justify-between px-2 h-1/2 items-end ">
                            <button className='hover:text-darkMint' onClick={previousPage} ><ChevLeft /></button>
                            <button className='hover:text-darkMint ' onClick={nextPage}><ChevRight /></button>
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
                                    <button className={`heroButton rounded-full h-4 w-4 ${index === currentPage ? 'bg-darkMint' : 'bg-zinc-200'}`} onClick={() => paginate(index)}>
                                        
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}
