import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateAddress = (address: any) => {
  if (!address) return "No Account"
  const match = address.match(/^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}
