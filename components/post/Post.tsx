import { moment_timeAge } from '@/lib/moment'
import { PostType } from '@/types'
import Link from 'next/link'
import React from 'react'
import Like from './Like'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { MessageSquare } from 'lucide-react'
import DeletePost from './Delete'

export default async function Post({post, details}: {post: PostType, details?: boolean}) {
  const session = await getServerSession(authOptions)
  const isLiked = post.likes.find(like => {
      return like.user.id === session?.user.id
  })
  return (
      <Card key={post.id}>
        <CardHeader>
          <Link href={`/user/${post.user.id}`} className='flex items-center space-x-2'>
            <Avatar>
              <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className='space-dy-1'>
              <CardTitle className='text-lg font-normal'>{post.user.name}</CardTitle>
              <CardDescription>{moment_timeAge(post.createdAt)}</CardDescription>
            </div>
          </Link>
        </CardHeader>
        <CardContent>
          {details ?
            <p className="text-gray-700 text-base">
              {post.description}
            </p>:
            <Link href={`/posts/${post.id}`} >
              <p className="text-gray-700 text-base line-clamp-3">
                {post.description}
              </p>
            </Link>
          }
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div className='flex items-center space-x-2'>
            <Like post={post} isLiked={isLiked}/>
            {details ?
              <div className="flex items-center">
                <span className='pe-1'>{post.comments.length}</span>
                <MessageSquare />
              </div> : 
              <Link href={`/posts/${post.id}`} className="flex items-center">
                <span className='pe-1'>{post.comments.length}</span>
                <MessageSquare />
              </Link>}
          </div>
         {post.user.id === session?.user.id && <DeletePost id={post.id} session={session} postOrComment='post'/>}
        </CardFooter>
      </Card>
  )
}
