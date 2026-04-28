import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()

  return <h1>Detalle de producto {id}</h1>
}

export default ProductDetail
