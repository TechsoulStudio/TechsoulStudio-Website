"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu, IoMdClose } from "react-icons/io";

// -------------------- TYPES --------------------
interface SidebarContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

interface SidebarProviderProps {
  children: ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}

interface SidebarBodyProps {
  className?: string;
  children: ReactNode;
}

interface SidebarLinkProps {
  link: { href: string; label: string; icon: ReactNode };
  className?: string;
}

interface SidebarButtonProps {
  content: { onClick: () => void; label: string; icon: ReactNode };
  className?: string;
}

// -------------------- CONTEXT --------------------
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// -------------------- PROVIDER --------------------
export const SidebarProvider: FC<SidebarProviderProps> = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// -------------------- MAIN SIDEBAR WRAPPER --------------------
export const Sidebar: FC<SidebarProviderProps> = ({
  children,
  open,
  setOpen,
  animate,
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

// -------------------- BODY --------------------
export const SidebarBody: FC<SidebarBodyProps> = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

// -------------------- DESKTOP --------------------
export const DesktopSidebar: FC<SidebarBodyProps> = ({
  className,
  children,
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden sm:flex sm:flex-col w-[300px] shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "200px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </motion.div>
  );
};

// -------------------- MOBILE --------------------
export const MobileSidebar: FC<SidebarBodyProps> = ({ className, children }) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "px-4 py-4 fixed sm:hidden flex items-center justify-between  w-full"
      )}
    >
      <div className="flex justify-start z-20 w-full">
        <IoMdMenu
          size={20}
          className="text-white"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0  p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-white cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <IoMdClose />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// -------------------- LINK --------------------
export const SidebarLink: FC<SidebarLinkProps> = ({ link, className }) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-4 group/sidebar py-2",
        className
      )}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="flex items-center text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

// -------------------- BUTTON --------------------
export const SidebarButton: FC<SidebarButtonProps> = ({
  content,
  className,
}) => {
  const { open, animate } = useSidebar();
  const { onClick, label, icon } = content;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-4 group/sidebar py-2",
        className
      )}
    >
      {icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="flex items-center text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
      >
        {label}
      </motion.span>
    </button>
  );
};
