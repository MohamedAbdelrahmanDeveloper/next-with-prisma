'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { Textarea } from "../ui/textarea"
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "../ui/use-toast"

export function UpdatePost({postId,session}: {postId:string, session: Session | null}) {
  const [description, setDescription] = useState<string>()
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  async function updatePostHandel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description) {
      return toast({description: 'Please enter post', variant: 'destructive'});
    }
    await axios.put(`/api/posts/${postId}`, {
      description
    },{
      headers: {
        Authorization: session?.user.accessToken
      }
    }).then(res=> {
      setOpen(false)
      router.refresh()
    }).catch(err=>{
      if (err?.response?.status) {
        return toast({description: err?.response?.data.message, variant: 'destructive'});
      }        
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={updatePostHandel} className="grid gap-4 py-4">
          <Textarea onChange={e =>setDescription(e.target.value)}/>
          <DialogFooter>
              <Button type="submit">Save changes</Button>
          </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>
  )
}
