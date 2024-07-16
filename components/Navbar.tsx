import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleReload = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (router.pathname === "/") {
      event.preventDefault();
      router.push("/").then(() => router.reload());
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-2xl font-bold" onClick={handleReload}>
            FlickNest
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
