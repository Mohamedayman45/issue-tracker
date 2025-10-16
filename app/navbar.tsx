"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {

  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: "Issues", path: "/issues" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      <nav className="flex gap-5 border-b p-3 h-20 items-center">
        <Link href="/">
          <AiFillBug size={40} />
        </Link>
        <ul className="flex gap-3">
          {links.map((link) => {
            const isActive = mounted && pathname === link.path;

            return (
              <li key={link.name}>
                <Link
                  className={classnames({
                    "bg-blue-500": isActive,
                    "bg-gray-900": !isActive,
                    "hover:bg-blue-500 text-white": true,
                    "rounded p-2": true,
                  })}
                  href={link.path}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
