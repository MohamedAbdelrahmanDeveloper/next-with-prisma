import { moment_timeAge } from '@/lib/moment'
import { CommentType, PostType } from '@/types'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import DeleteButton from '../post/Delete'
import { arabicRegex } from '@/lib/arabic'
import { UpdateComment } from './UpdateComment'

export default async function Comment({comment, session, post}: {comment: CommentType, session: any, post: PostType}) {
  return (
    <div className="flex items-start gap-x-2">
      <Link href={`/user/${comment.user.id}`}>
        <Avatar>
          <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </Link>
      <Card className="w-full">
        <CardContent className='p-3 flex justify-between'>
          <div dir={arabicRegex.test(comment.text) ? 'rtl' : 'ltr'} className='w-full'>
            <p className="text-gray-900">{comment.text}</p>
            <p className="text-gray-600 text-sm ">{moment_timeAge(comment.createdAt)}</p>
          </div>
          {comment.user.id === session?.user.id && <UpdateComment />}
          {(comment.user.id === session?.user.id || post.user.id === session?.user.id) && <DeleteButton id={comment.id} session={session} postOrComment='comment'/>}
        </CardContent>
      </Card>
      
    </div>
  )
}
