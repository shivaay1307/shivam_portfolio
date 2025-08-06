import * as React from "react"
import Layout from "@components/layout"
import Seo from "@components/seo"
import { SplitText } from '@animations/SplitText';

const NotFoundPage = () => (
  <Layout>
    <h1>
      <SplitText by="WORD" as="i" animate>
        404: Not Found
      </SplitText>
    </h1>
    <p>
      <SplitText by="WORD" as="i" animate>
        You just hit a route that doesn&#39;t exist... the sadness.
      </SplitText>
    </p>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
