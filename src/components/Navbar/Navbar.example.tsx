import * as React from "react";
import { Navbar } from "./Navbar";
import { NightModeSwitch } from "../NightModeSwitch";

export const NavbarExample: React.FC = () => (
  <Navbar>
    <div className="flex items-center gap-4 px-4 w-full">
      <span className="font-bold text-xl text-gray-900 dark:text-white">My App</span>
      <nav className="flex gap-2 ml-auto">
        <a href="/" className="text-blue-500 dark:text-blue-400">Home</a>
        <a href="/about" className="text-blue-500 dark:text-blue-400">About</a>
      </nav>
      <NightModeSwitch className="ml-4" variant="ghost" size="md" ariaLabel="Toggle dark mode" />
    </div>
  </Navbar>
);