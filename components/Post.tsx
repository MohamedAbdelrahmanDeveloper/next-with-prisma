import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import Link from 'next/link'
import React from 'react'
import Like from './Like'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Post({post, details}: {post: PostType, details?: boolean}) {
  const session = await getServerSession(authOptions)
  const isLiked = post.likes.find(like => {
      return like.user.id === session?.user.id
  })
  return (
    <div key={post.id} className=''>
      <div className=" rounded overflow-hidden shadow bg-white">
        <div className="px-6 py-4">
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/150" alt="Profile Picture"/>
                <div className="text-sm">
                    {details ? 
                      <h3 className="text-gray-900 leading-none font-semibold">{post.user.name}</h3>:
                      <Link href={`/user/${post.user.id}`} className="text-gray-900 leading-none font-semibold">{post.user.name}</Link>
                    }
                    
                    <p className="text-gray-600">{`${moment_timeAge(post.createdAt)}`}</p>
                </div>
            </div>
            <div className="py-6">
            {details ?
                <p className="text-gray-700 text-base">
                  {post.description}
                </p>:
                <Link href={`/posts/${post.id}`} >
                  <p className="text-gray-700 text-base">
                    {post.description}
                  </p>
                </Link>
            }
            </div>
            <div className="flex items-center justify-between">
                <Like post={post} isLiked={isLiked}/>
                {details ? 
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    <span className="text-gray-600">
                      <span className='pe-2'>{post.comments.length}</span>
                      Comment
                    </span>
                </div>
                :  
                <Link href={`/posts/${post.id}`} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    <span className="text-gray-600">
                      <span className='pe-2'>{post.comments.length}</span>
                      Comment
                    </span>
                </Link>
              }
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    <span className="text-gray-600">More</span>
                </div>
                {post.user.id === session?.user?.id && <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    <span className="text-gray-600">More</span>
                </div>}
            </div>
        </div>
        </div>
    </div>
  )
}
