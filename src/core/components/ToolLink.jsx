import { Link } from "react-router"

export const ToolLink = ({link, title}) => {
  return (
    <Link to={link} className="border-solid border-2 border-lime-500 p-3 hover:bg-lime-500 hover:text-slate-900 hover:transition-all hover:duration-200 duration-200">
        {title}
    </Link>
  )
}
