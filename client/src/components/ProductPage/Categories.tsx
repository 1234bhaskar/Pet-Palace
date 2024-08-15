import React from 'react'

export default function Categories() {
    const categories=[
        {id:1,name:"ALL"},
        {id:2,name:"DOG"},
        {id:3,name:"CAT"},
        {id:4,name:"RAINWEAR"}  
    ]
  return (
    <div>
        <span><h1 className='text-4xl sm:my-5 mt-2'>Products</h1></span>
        {/* //categoies */}
        <div className='w-full '>
            <div className='sm:w-1/4 mx-2 sm:m-0 grid grid-cols-3 gap-2 my-8 '>
                {categories.map((e)=>
                   (<span className='border border-black flex justify-center sm:hover:bg-black sm:hover:text-white sm:hover:font-bold'>{e.name}</span>)
                )}
                </div>
        </div>
    </div>
  )
}
