interface Props {
  message: string
}

const SuccessMessage = ({ message }: Props) => (
  <div
    className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-green border border-green-400 text-green-700 px-4 py-3 rounded-lg'
    role='alert'
  >
    <span className='block sm:inline'>{message}</span>
  </div>
)

export default SuccessMessage
