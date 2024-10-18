"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, HelpCircle, Menu, X, LogOut, ShoppingBag, Logs } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 right-4 z-50 text-black rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Title with Beta tag */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">ERP</h1>
          <span className="bg-blue-500 text-xs font-semibold px-2 py-1 rounded-full">Beta</span>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <Home className="mr-3" size={20} />
                <span className="text-sm">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <ShoppingBag className="mr-3" size={20} />
                <span className="text-sm">Inventory</span>
              </Link>
            </li>
            <li>
              <Link href="/orders" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <Logs className="mr-3" size={20} />
                <span className="text-sm">Manage Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/guides" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <HelpCircle className="mr-3" size={20} />
                <span className="text-sm">How-to</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <button className="flex items-center p-2 rounded-md hover:bg-gray-700 mt-auto text-red-400">
          <LogOut className="mr-3" size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}