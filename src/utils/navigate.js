import { useNavigate } from 'react-router-dom'
//  FUNÇÃO DE NAVEGAR ENTRE PAGINAS

export default function ToPage(route) {
  const navigate = useNavigate()

  return navigate(route)
}
