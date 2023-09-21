

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-blue-400 login-bg">
      <div className="m-auto bg-slate-50 rounded-md w-5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 h-3/4">
        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-10"> {children} </div>
        </div>
      </div>
    </div>
  )
}
