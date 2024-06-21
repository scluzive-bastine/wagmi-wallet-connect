interface Props {
  message: string
}

const ErrorMessage = ({ message }: Props) => (
  <div
    className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg'
    role='alert'
  >
    <span className='block sm:inline'>{message}</span>
  </div>
)

export default ErrorMessage
