'use client'
import { axiosCustom } from '@/lib/axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

export default function AddPostPage({setRefresh}: {setRefresh: Dispatch<SetStateAction<boolean>>}) {
    const [description, setDescription] = useState<string>()
    // TODO : here
    const [errors, setErrors] = useState<null>();
    const [serverError, setServerError] = useState<null>();
    
    const AddPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await axiosCustom.post('api/posts', {
            description
        })
        if (res.status === 201) {
            setRefresh(e=> !e)
        }
    }
  return (
    <form onSubmit={AddPost} className='py-10 flex flex-col gap-y-2 [&>input]:p-4 [&>input]:rounded-lg text-black'>
        <input type="text" placeholder='post' onChange={e => setDescription(e.target.value)}/>
        <input type="submit" className='bg-blue-500 cursor-pointer' value='add post'/>
    </form>
  )
}
