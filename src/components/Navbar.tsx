"use client"

// Import necessary components and hooks from external libraries and local project files
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // Dropdown menu components
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu" // Dropdown menu separator
import Image from "next/image" // Next.js Image component

import { useAccount, useConnect, useDisconnect } from "wagmi" // Wagmi hooks for wallet management
import ConnectedAccount from "./ConnectedAccount" // Custom component to display connected account info
import ErrorMessage from "./Error" // Custom component to display error messages
import { Button } from "./ui/button" // Custom Button component

// Navbar component to handle wallet connection and display status
const Navbar = () => {
  // Retrieve account details, connection functions, and status using Wagmi hooks
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    // Navbar container with styling
    <div className='flex justify-between max-w-7xl mx-auto border-b border-gray-200 py-4'>
      {/* Logo and title */}
      <div className='flex gap-3 items-center'>
        <div className='h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-pink-400'></div>
        <p className='text-lg font-medium'>Wallet Connect</p>
      </div>

      {/* Dropdown menu for wallet connection actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Button to trigger dropdown menu */}
          <Button className='h-11 rounded-lg px-4 flex items-center text-white'>
            {/* Display connection status */}
            {account.status === "connected"
              ? "Connected"
              : account.status === "connecting"
                ? "Loading..."
                : "Connect Wallet"}
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent className='max-w-[300px] w-[300px]'>
          {/* If account is connected, show disconnect option */}
          {account.isConnected ? (
            <div className='flex flex-col gap-2'>
              <ConnectedAccount address={account.address} />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => disconnect()}
                className='bg-red-100 !hover:bg-red-200 text-red-600 h-11 cursor-pointer'
              >
                Disconnect
              </DropdownMenuItem>
            </div>
          ) : (
            // If account is not connected, show available connectors
            connectors.map((connector) => (
              <DropdownMenuItem
                key={connector.id}
                onClick={() => connect({ connector })}
                className='flex gap-4 cursor-pointer'
              >
                <div className='w-8 h-8 rounded-full border border-gray-300 relative'>
                  {/* Display connector icon */}
                  <Image
                    src={connector.icon!}
                    className='w-full h-full object-contain rounded-full'
                    fill
                    alt={connector.name}
                  />
                </div>
                {connector.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Display error message if there is an error during connection */}
      {error && <ErrorMessage message={error.message} />}
    </div>
  )
}

export default Navbar
