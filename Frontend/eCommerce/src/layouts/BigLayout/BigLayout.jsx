import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./BigLayout.module.css";

export default function Layout() {
  return(
    <>
      <Header/>
        <main >
          <Outlet/>
        </main>
      <Footer/>
    </>
  );
}