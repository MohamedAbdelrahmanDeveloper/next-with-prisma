'use client'
import axios from 'axios';
import { Session } from 'next-auth'
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function DeletePost({id, session, postOrComment}: {id: string, session: Session | null, postOrComment: 'post' | 'comment'}) {
  const router = useRouter()
  const url = postOrComment === 'post' ? `/api/posts/${id}` : `/api/comments/${id}`
  function removeItem() {
    axios.delete(url ,{
      headers: {
        Authorization: session?.user.accessToken
      }
    }).then(res=> {
      router.refresh()
    })
  }
  return (
    <Button variant={'destructive'} onClick={removeItem}>Delete</Button>
  )
}
