"use client"
import { useAppDispatch, useAppSelector } from '@/app/Redux/hooks';
import { AddCategories, RemoveCategories } from '@/app/Redux/Slices/Categories/Categories';
import React from 'react'
import { ButtonComponent } from '../button';

export default function Categories() {
  const CartNumber=useAppSelector(categories => categories.Categories.name)
  // console.log(CartNumber);
  
  const dispatch=useAppDispatch();
    const categories=[
        {id:1,name:"ALL"},
        {id:2,name:"dog"},
        {id:3,name:"cat"},
        {id:4,name:"toy"},
        {id:5,name:"cloth"}
    ]
  return (
    <div>
        <span><h1 className='text-4xl sm:my-5 mt-2'>Products</h1></span>
        {/* //categoies */}
        <div className='w-full '>
          <div>{CartNumber.length}</div>
            <div className='sm:w-1/4 mx-2 sm:m-0 flex gap-10 my-8 '>
                {categories.map((e,index)=>
                  (<div onClick={()=>dispatch(AddCategories(e.name))} key={index} className='flex'><ButtonComponent width={100}  title={e.name}></ButtonComponent></div>)
                )}
              </div>
        </div>
    </div>
  )
}
