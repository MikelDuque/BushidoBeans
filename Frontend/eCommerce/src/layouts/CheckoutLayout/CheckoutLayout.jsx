import { Outlet } from "react-router-dom";
import HeaderChk from "../../components/Header/HeaderChk/HeaderChk";
import Footer from "../../components/Footer/Footer";
import "./CheckoutLayout.module.css";

export default function Layout() {
  return(
    <>
      <HeaderChk/>
        <main >
          <Outlet/>
        </main>
      <Footer/>
    </>
  );
}