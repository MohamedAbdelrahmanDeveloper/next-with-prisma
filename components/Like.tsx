'use client'

import { PostType } from '@/types'
import axios from 'axios'
import { ThumbsUp, ThumbsUpIcon } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Like({post, isLiked}: {post: PostType, isLiked: any}) {
    const router = useRouter()
    const likeHandeler = () => {
        getSession().then((tok) => {
            axios.post(`/api/posts/${post.id}/like`, {},{
                headers: {
                    Authorization: tok?.token
                }
            }).then(res=>{
                router.refresh();
            }).catch(err => console.log(err))
        })
    }
  return (
    <button onClick={likeHandeler}  className={`flex items-end leading-snug`}>
        <span className='pe-1'>{post.likes.length}</span>
        <ThumbsUpIcon  className={isLiked ? 'fill-blue-500 text-transparent' : 'text-muted-foreground'} />
    </button>
  )
}
