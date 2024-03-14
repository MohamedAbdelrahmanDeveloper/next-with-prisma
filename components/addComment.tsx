'use client'
import { PostType } from '@/types'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddComment({post}: {post: PostType}) {
    const [text, setText] = useState<string>()
    const router = useRouter()

    const AddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getSession().then((tok) => {
            axios.post(`/api/posts/${post.id}/comment`, {
                text
            }, {
                headers: {
                    Authorization: tok?.token
                }
            }).then(res => {
                setText('')
                router.refresh()
            }).catch(err => console.log(err))
        })
    }
  return (
    <form onSubmit={AddComment} className="flex items-center mt-4">
        <img className="w-8 h-8 rounded-full mr-2" src="https://via.placeholder.com/150" alt="Profile Picture" />
        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-4" onChange={e => setText(e.target.value)} placeholder="Add a comment..."/>
    </form>
  )
}
