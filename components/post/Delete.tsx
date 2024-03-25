'use client'
import axios from 'axios';
import { Session } from 'next-auth'
import React from 'react'
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import { toast } from '../ui/use-toast';

export default function DeleteButton({id, session, postOrComment}: {id: string, session: Session | null, postOrComment: 'post' | 'comment'}) {
  const router = useRouter()
  const url = postOrComment === 'post' ? `/api/posts/${id}` : `/api/comments/${id}`
  function removeItem() {
    axios.delete(url ,{
      headers: {
        Authorization: session?.user.accessToken
      }
    }).then(res=> {
      router.refresh()
    }).catch(err=> {
      if (err?.response?.status >= 400) {
        return toast({description: err?.response?.data.message, variant: 'destructive'});
      }
      console.log(err);
    })
  }
  return (
    <Trash className='text-destructive cursor-pointer ms-2' onClick={removeItem} />
  )
}
