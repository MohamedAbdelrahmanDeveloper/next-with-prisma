import { moment_timeAge } from '@/lib/moment'
import { CommentType } from '@/types'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { DeleteIcon } from 'lucide-react'

export default async function Comment({comment, session}: {comment: CommentType, session: any}) {
  return (
    <div className="flex items-start gap-x-2">
      <Link href={`/user/${comment.user.id}`}>
        <Avatar>
          <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </Link>
      <Card className="w-full">
        <CardContent className='p-3 flex justify-between'>
          <div>
            <p className="text-gray-900">{comment.text}</p>
            <p className="text-gray-600 text-sm ">{moment_timeAge(comment.createdAt)}</p>
          </div>
          {comment.user.id === session.user.id && <Button size={'icon'} variant={'ghost'} className='text-red-500 p-2'><DeleteIcon size={25}/></Button>}
        </CardContent>
      </Card>
      
    </div>
  )
}
