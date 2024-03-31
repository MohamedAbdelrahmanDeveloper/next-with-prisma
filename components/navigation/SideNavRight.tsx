import React from "react";
import { Earth, Facebook, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function SideNavRight() {
  return (
    <div className="hidden md:flex justify-center items-center col-span-2 h-24 sticky top-0">
      <ul className="h-full flex items-center gap-x-4">
        <li className="hover:text-primary">
          <Link target="_blank" href="https://www.faecebook.com/MohamedAbdelrahmanDeveloper">
            <Facebook />
          </Link>
        </li>
        <li className="hover:text-primary">
          <Link target="_blank" href="https://www.github.com/MohamedAbdelrahmanDeveloper">
            <Github />
          </Link>
        </li>
        <li className="hover:text-primary">
          <Link target="_blank" href="https://www.linkedin.com/in/MohamedAbdelrahmanDeveloper">
            <Linkedin />
          </Link>
        </li>
        <li className="hover:text-primary">
          <Link target="_blank" href="https://mohamedabdelrahmandeveloper.vercel.app/">
            <Earth />
          </Link>
        </li>
      </ul>
    </div>
  );
}
