import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import Link from 'next/link'
import React from 'react'
import Like from './Like'
import AddComment from './addComment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Comment from './Comment'
import Post from './Post'

export default async function PostDetails({post}: {post: PostType}) {
  const session = await getServerSession(authOptions)
  const isLiked = post.likes.find(like => {
      return like.user.id === session?.user.id
  })
  return (
    <div key={post.id} className=''>
        <Post key={post.id} post={post} details/>
        <AddComment key={post.id} post={post}/>
        <div className='space-y-2 py-2 border-s-2 mt-4'>
          {
            post.comments.map(comment => (
              <Comment session={session} key={comment.id} comment={comment} />
            ))
          }
        </div>
    </div>
  )
}
