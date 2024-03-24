'use client'
import { PostType } from '@/types'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

export default function AddComment({post, session}: {post: PostType, session: any}) {
    const [text, setText] = useState<string>()
    const router = useRouter()

    const AddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getSession().then((tok) => {
            axios.post(`/api/posts/${post.id}/comment`, {
                text
            }, {
                headers: {
                    Authorization: tok?.user.accessToken
                }
            }).then(res => {
                setText('')
                router.refresh()
            }).catch(err => console.log(err))
        })
    }
    
  return (
    <form onSubmit={AddComment} className="flex items-start my-4 mx-2 gap-x-2">
        <Avatar>
            <AvatarFallback>{session.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <Textarea onChange={e => setText(e.target.value)} placeholder='Add a comment...'/>
        <Button>send</Button>
    </form>
  )
}
