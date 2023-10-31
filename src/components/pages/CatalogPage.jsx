import Banner from "../Banner"
import React from "react";
import Catalog from "../Catalog";
import Header from "../Header";
import Footer from "../Footer";

const CatalogPage = () => {
    return(
    <div>
      <Header/>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner/>
            <Catalog form={true}/>
          </div>
        </div>
      </main>
      <Footer /> 
    </div>
    )
}

export default CatalogPage;