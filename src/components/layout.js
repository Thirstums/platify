import ClientOnly from "@/pages/clientOnly";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <ClientOnly>
        <Nav />
      </ClientOnly>
      <main>{children}</main>
      <Footer />
    </>
  );
}
