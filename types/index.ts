export interface PropsMethodParamsType {
  params: { id: string };
}

export interface PostType {
    id: number;
    description: string;
    createdAt: string;
    user: UserForPostType
    userId: number
}

export interface UserForPostType {
    id: number, firstName: string, lastName: string, username: string
}
