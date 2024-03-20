'use client'
import { urlServer } from '@/lib/axios';
import axios from 'axios';
import { Session } from 'next-auth'
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function DeletePost({postId, session}: {postId: string, session: Session | null}) {
  const router = useRouter()
  function removePost() {
    axios.delete(`/api/posts/${postId}`,{
      headers: {
        Authorization: session?.user.accessToken
      }
    }).then(res=> {
      router.refresh()
    })
  }
  return (
    <Button variant={'destructive'} onClick={removePost}>Delete</Button>
  )
}
