import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
        Home
      </NavLink>
      <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
        Favorites
      </NavLink>
      <NavLink to="/random" className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
        Random
      </NavLink>
    </nav>
  )
}
