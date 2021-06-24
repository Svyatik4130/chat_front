import React from 'react'

export default function Loader() {
    return (
        <div className="w-screen h-screen flex bg-green-100 items-stretch">
            <div className="w-10/12 h-3/6 m-auto rounded md:w-6/12">
                <div className="min-h-full -mt-20">
                    <img src="loader_top.svg" className='m-auto z-10 w-28 animate-frogHatAnim md:w-36 ' alt="frog_top" />
                    <img src="loader_bot.svg" className="m-auto z-40 w-72 md:w-96" alt="frog_bot" />
                </div>
            </div>
        </div>
    )
}
