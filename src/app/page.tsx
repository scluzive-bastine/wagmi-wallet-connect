"use client"

// Import necessary components and hooks
import ConnectedAccount, { Address } from "@/components/ConnectedAccount"
import ErrorMessage from "@/components/Error"
import SuccessMessage from "@/components/SuccessMessage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { config } from "@/lib/wagmi.config"
import { useEffect, useState } from "react"
import { parseEther } from "viem"
import { useAccount, useBalance, useSendTransaction, type BaseError } from "wagmi"

function App() {
  // State variables to manage form inputs
  const [amount, setAmount] = useState<string>("")
  const [receiverAddress, setReceiverAddress] = useState<string>("")

  // Hook to get the current account information
  const account = useAccount()
  const { address } = account

  // Hook to get the balance of the current account
  const {
    data,
    isError: balanceError,
    isLoading: balanceLoading,
  } = useBalance({
    address: address,
  })

  // Hook to handle sending transactions
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
    isSuccess,
  } = useSendTransaction({
    config,
  })

  // Function to handle sending the transaction
  const handleSendTransaction = async () => {
    sendTransaction({
      account: address,
      to: receiverAddress as Address,
      value: parseEther(amount),
    })
  }

  // Effect to clear the form once the transaction is confirmed
  useEffect(() => {
    if (hash) {
      setAmount("")
      setReceiverAddress("")
    }
  }, [hash])

  return (
    <>
      {account.isConnected ? (
        <div className='w-full h-full flex items-center justify-center max-w-lg mx-auto'>
          <div className='border border-gray-200 rounded-xl w-full my-40 shadow-lg'>
            <div className='flex items-center border-b border-gray-200 p-5 bg-gray-50 rounded-t-xl'>
              <div className='w-full flex gap-4 items-center'>
                <ConnectedAccount address={account.address} />
              </div>
              {balanceLoading ? (
                "Fetching balance"
              ) : balanceError ? (
                "Error Fetching balance"
              ) : (
                <div className='flex gap-2'>
                  <span>{data?.formatted}</span>
                  <span>{data?.symbol}</span>
                </div>
              )}
            </div>
            <div className='pt-20 flex flex-col gap-2 justify-center p-5'>
              <h1 className='text-center text-lg font-semibold'>Send a Transaction</h1>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='amount'>Amount</Label>
                  <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='receiverAddress'>Receiver</Label>
                  <Input
                    value={receiverAddress}
                    name='receiverAddress'
                    onChange={(e) => setReceiverAddress(e.target.value)}
                  />
                </div>
              </div>
              <Button
                size={"lg"}
                onClick={handleSendTransaction}
                disabled={isPending}
                className='rounded-lg flex items-center bg-emerald-600 hover:bg-emerald-600/90 text-white mt-5'
              >
                {isPending ? "Confirming" : "Send Transaction"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex items-center justify-center max-w-lg mx-auto border border-gray-300 p-5 rounded-lg my-40'>
          <p>Connect Wallet to use App!!</p>
        </div>
      )}

      {/* Display error message if there's an error */}
      {error && <ErrorMessage message={(error as BaseError).shortMessage || error.message} />}

      {/* Display success message when transaction is confirmed */}
      {hash && <SuccessMessage message='Transaction Confirmed' />}
    </>
  )
}

export default App
