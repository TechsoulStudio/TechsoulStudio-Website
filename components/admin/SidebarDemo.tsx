"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarBody,
  SidebarButton,
  SidebarLink,
} from "@/components/ui/sidebar/Sidebar";
import { MdDashboard, MdReviews, MdUnsubscribe } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { BsBagHeart } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoIcon from "../../public/images/1.png";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserRoundPlus } from "react-icons/lu";

export function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IoHomeOutline size={22} className="text-[#babbb5]" />,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <MdDashboard size={22} className="text-[#babbb5]" />,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: <BsBagHeart size={22} className="text-[#babbb5]" />,
    },
    {
      label: "User Query",
      href: "/admin/inquiry",
      icon: <RiMessage2Fill size={22} className="text-[#babbb5]" />,
    },
    {
      label: "NewsLetter",
      href: "/admin/subscriber",
      icon: <MdUnsubscribe size={25} className="text-[#babbb5]" />,
    },
    {
      label: "Team",
      href: "/admin/team",
      icon: <LuUserRoundPlus size={22} className="text-[#babbb5]" />,
    },
    {
      label: "Reviews",
      href: "/admin/reviews",
      icon: <MdReviews size={22} className="text-[#babbb5]" />,
    },
    {
      label: "Blogs",
      href: "/admin/blog",
      icon: <FaBlog size={22} className="text-[#babbb5]" />,
    },
    {
      label: "Social Media Post",
      href: "/admin/social-media-post",
      icon: <GiFilmProjector size={22} className="text-[#babbb5]" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
    router.push("/");
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="bg-[#5a5d59]">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto mt-3">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-5 text-[#babbb5]">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <SidebarButton
          content={{
            onClick: handleLogout,
            label: "Logout",
            icon: <CiLogout className="text-[#babbb5]" size={25} />,
          }}
        />
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center space-x-2 no-underline text-white"
  >
    <Image src={logoIcon} alt="Logo" width={30} height={30} />
    <h1 className="font-semibold text-lg">Techsoulstudio</h1>
  </Link>
);

export const LogoIcon = () => (
  <Link href="/" className="flex items-center justify-center no-underline">
    <Image src={logoIcon} alt="Logo" width={50} height={50} />
  </Link>
);
