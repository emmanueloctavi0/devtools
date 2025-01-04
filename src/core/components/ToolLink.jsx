import { Link } from "react-router"

export const ToolLink = () => {
  return (
    <Link to="/base64" className="border-solid border-2 border-lime-500 p-3 hover:bg-lime-500 hover:text-slate-900 hover:transition-all hover:duration-200 duration-200">
        Base64 Encoder
    </Link>
  )
}
