import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollIntro from "../../components/Intro/Intro";
import "./HomeLayout.module.css";

export default function Layout() {
  const [hasScrolledIntro, setHasScrolledIntro] = useState(false);

  useEffect(() => {
    const introShown = sessionStorage.getItem("hasScrolledIntro");

    if (introShown === "true") {
      document.body.style.overflow = "";
      setHasScrolledIntro(true);
    } else {
      setTimeout(() => {
        sessionStorage.setItem("hasScrolledIntro", "true");
        setHasScrolledIntro(true);
      }, 4000);
    }
  }, []);

  return(
    <>
      {!hasScrolledIntro && <ScrollIntro/>}
      <Header/>
        <main >
          <Outlet/>
        </main>
      <Footer/>
    </>
  );
}