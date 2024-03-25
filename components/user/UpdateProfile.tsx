'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import SessionProviderComponent from "../session/Provider"
import FormUpdateProfile from "./FormUpdateProfile"
import { useState } from "react"


export default function UpdateProfile() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <SessionProviderComponent>
          <FormUpdateProfile setOpenDialog={setOpen}/>
        </SessionProviderComponent>
      </DialogContent>
    </Dialog>
  )
}
