import { UserUpdateZodSchema } from '@/lib/zodSchema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function FormUpdateProfile({setOpenDialog}:{setOpenDialog : Dispatch<SetStateAction<boolean>>}) {
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const router = useRouter();
    const {data: session , update} = useSession()
  
    async function updateProfileHandel(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let validation = UserUpdateZodSchema.safeParse({name, username})
      if (!validation.success) {
        return toast({description: validation.error.errors[0].message, variant: 'destructive'});
      }
      await axios.put('/api/user', {
        name,
        username
      },{
        headers: {
          Authorization: session?.user.accessToken
        }
      }).then(res=> {
        update({
          ...session,
          user: {
            ...session?.user,
            name,
            username
          }
        }).then(r=> {
          setOpenDialog(false)
          router.refresh()
        }).catch(er => {
          console.log('error session', er);
        })
      }).catch(err=>{
        if (err?.response?.status) {
          return toast({description: err?.response?.data.message, variant: 'destructive'});
        }        
      })
    }
  return (
    <form onSubmit={updateProfileHandel} className="grid gap-4 py-4">
        <Input label="name" setValue={setName}/>
        <Input label="username" setValue={setUsername}/>
        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </form>
  )
}
