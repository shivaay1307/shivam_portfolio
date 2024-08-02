import * as React from "react"
import { Link } from "gatsby"
import profile from "@images/shivam.jpg"

const Header = () => (
  <header className="header">
    <div>
      <img alt="profile" className="header-profile" src={profile} />
    </div>
    <div>
      <Link to="/" className="header-links">
        Work Experience
      </Link>
      <Link to="/" className="header-links">
        Education
      </Link>
      <Link to="/" className="header-links">
        Skills
      </Link>
      <Link to="/" className="header-links">
        Projects
      </Link>
    </div>
  </header>
)

export default Header
