import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/notes'>Notes</Link>
      </ul>
    </nav>
  )
}

export default Navbar
