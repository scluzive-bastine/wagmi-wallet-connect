import { truncateAddress } from "@/lib/utils"

export type Address = `0x${string}`
interface Props {
  address: Address | undefined
}

const ConnectedAccount = ({ address }: Props) => {
  return (
    <div className='flex gap-4 items-center border border-gray-200 rounded-lg p-4'>
      <div className='h-8 w-8 rounded-full relative bg-gradient-to-br from-pink-400 to-emerald-200 flex-shrink-0'></div>
      <p className='font-semibold text-sm'>{truncateAddress(address)}</p>
    </div>
  )
}

export default ConnectedAccount
