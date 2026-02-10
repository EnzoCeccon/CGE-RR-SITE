import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container page">
      <h1>Página não encontrada</h1>
      <p>O endereço informado não existe ou foi movido.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Voltar para o início</Link>
      </p>
    </div>
  )
}





