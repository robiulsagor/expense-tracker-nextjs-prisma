
const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-200 p-2">
      <div className="p-5 w-full md:w-[50%] lg:w-[60%] xl:w-[45%]  rounded-md shadow-md bg-slate-100">
      {children}
      </div>
    </div>
  )
}

export default AuthLayout
