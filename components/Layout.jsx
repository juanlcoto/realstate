import Head from "next/head"
import Footer from "./Footer"
import NavBar from "./NavBar"
const Layout = ({ children,title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header >
      <NavBar />
    </header>
    <main className="container mx-auto p-4 lg:p-0">
      {children}
    </main>
    <footer>
      <Footer />
    </footer>
  </>
)

export default Layout