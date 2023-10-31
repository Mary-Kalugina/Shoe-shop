import React from "react";
import Hits from "../Hits";
import Banner from "../Banner";
import Catalog from "../Catalog";
import Footer from '../Footer';
import Header from '../Header';

const Main = () => {
    return(<>
        <Header />
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    <Hits />
                    <Catalog />
                </div>
            </div>
        </main>
        <Footer /> 
    </>
            
    )
}

export default Main;