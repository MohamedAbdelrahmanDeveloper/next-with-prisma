export interface PropsMethodParamsType {
  params: { id: string };
}

export interface DateAtType {
  createdAt: string;
  updatedAt: string
}

export interface PostType extends DateAtType {
    id: string;
    description: string;
    user: UserForPostType
    userId: string
    comments: CommentType[]
    likes: Like[]
}

export interface CommentType extends DateAtType {
  id: string,
  text: string,
  user: UserForPostType
}

export interface UserForPostType extends DateAtType{
    id: string,
    name: string,
    username: string
}

export interface UserType extends DateAtType{
    id: string,
    name: string,
    username: string,
    email: string
}

export interface Like extends DateAtType{
  id: string,
  user: UserType
}