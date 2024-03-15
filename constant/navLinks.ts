import { NavLinks } from "@/types";
import { Home, LogIn, LogInIcon, Shapes, User } from "lucide-react";


export const navLinks:NavLinks[] = [
    {
        text: 'Home',
        href: '/',
        icon: Home
    },
    {
        text: 'Profile',
        href: '/user',
        icon: User,
        visible: 'user'
    },
    {
        text: 'Posts',
        href: '/posts',
        icon: Shapes,
        visible: 'user'
    },
    {
        text: 'Login',
        href: '/login',
        icon: LogIn,
        visible: 'not-user'
    },
    {
        text: 'Register',
        href: '/register',
        icon: LogInIcon,
        visible: 'not-user'
    },
] 