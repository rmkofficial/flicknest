import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-2xl font-bold">FlickNest</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
