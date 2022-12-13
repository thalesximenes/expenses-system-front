import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <Link href="/" className="text-white font-bold flex-auto">
          Expense System
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
