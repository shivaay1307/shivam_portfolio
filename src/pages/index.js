import * as React from "react"
import Frontpage from "../components/frontpage"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./index.css"

const IndexPage = () => (
  <Layout>
      <Frontpage />
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
