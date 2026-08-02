const FieldError = ({message} : {message: string}) => {
  return (
    <span className="text-red-500 text-xs">{message}</span>
  )
}

export default FieldError
