"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { toast } from "../ui/use-toast";
import { postZodSchema } from "@/lib/zodSchema";

export default function AddPostPage({session}:{session: Session|null}) {
  const [description, setDescription] = useState<string>();
  const router = useRouter();

  const AddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation = postZodSchema.safeParse({description})
    if (!validation.success) {
      return toast({description: validation.error.errors[0].message, variant: 'destructive'});
    }
      axios
        .post(
          "/api/posts",
          {
            description,
          },
          {
            headers: {
              Authorization: session?.user.accessToken,
            },
          }
        )
        .then((res) => {
            setDescription('')
            router.refresh();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            toast({description: err.response.data.message, variant: 'destructive'});
          }
        });
  };

  return (
    <Card >
      <CardContent className="flex pt-6 gap-x-4">
        <Avatar className="w-10 h-10">
          <AvatarFallback>{session && session.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <form
          onSubmit={AddPost}
          className="w-full flex flex-col gap-y-2 [&>input]:p-4 [&>input]:rounded-lg text-black" >
          <Textarea onChange={e => setDescription(e.target.value)} placeholder='Add a post...'/>
          <div className="flex justify-end">
            <Button>add post</Button>
          </div>
      </form>
      </CardContent>
    </Card>
  );
}
