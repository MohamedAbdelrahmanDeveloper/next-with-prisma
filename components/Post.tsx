import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import Link from 'next/link'
import React from 'react'

export default function Post({post}: {post: PostType}) {
  return (
    <div key={post.id} className='shadow rounded p-4 bg-white'>
        <Link href={`/posts/${post.id}`} >
            <p className='text-lg'>{post.description}</p>
        </Link>
        <Link href={`/user/${post.user.id}`} >
            <p className='text-lg'>{post.user.name}</p>
        </Link>
        <time className='text-sm text-red-600 block'>{`${moment_timeAge(post.createdAt)}`}</time>
    </div>
  )
}
