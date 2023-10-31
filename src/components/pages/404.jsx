import React from "react";
import Banner from "../Banner";
import Header from "../Header";
import Footer from "../Footer";

const Page404 = () => {
    return (<>
    <Header/>
    <main className="container">
    <div className="row">
      <div className="col">
        <Banner/>
        <section className="top-sales">
          <h2 className="text-center">Страница не найдена</h2>
          <p>
            Извините, такая страница не найдена!
          </p>
        </section>
      </div>
    </div>
  </main>
  <Footer/>
  </>
    )
}

export default Page404;
