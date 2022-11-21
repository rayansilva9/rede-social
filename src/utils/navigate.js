import { useNavigate } from "react-router-dom"

export default function ToPage(route) {
  const navigate = useNavigate()

  return navigate(route)
}
