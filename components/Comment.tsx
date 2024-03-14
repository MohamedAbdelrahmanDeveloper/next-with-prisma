import { moment_timeAge } from '@/lib/moment'
import { CommentType } from '@/types'
import Link from 'next/link'
import React from 'react'

export default async function Comment({comment, session}: {comment: CommentType, session: any}) {
  return (
    <div className="w-full flex ">
      <div className='w-7 border-t-2'></div>
      <div className="flex items rounded-lg rounded-tl-none border w-full bg-white px-3 py-2">
          <img className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/150" alt="Profile Picture" />
          <div className="text-sm">
              <Link href={`/user/${comment.user.id}`} className='text-gray-900 leading-none font-semibold'>{comment.user.name}</Link>
              <p className="text-gray-900">{comment.text}</p>
              <p className="text-gray-600">{moment_timeAge(comment.createdAt)}</p>
              {comment.user.id === session.user.id && <p className='text-red-500'>Delete</p>}
          </div>
      </div>
    </div>
  )
}
