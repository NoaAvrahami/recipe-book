import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="panel detail-placeholder">
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link className="youtube-link" to="/">Return home</Link>
    </section>
  )
}
