import React from "react";
import Header from "./Header";
import Head from "next/head";
import { Container } from "semantic-ui-react";
//Head take add this css in HTML head tag (mens this apply over all page)
const Layout = (props) => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
export default Layout;
