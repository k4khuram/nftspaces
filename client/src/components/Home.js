import React, { Component } from "react";
import {Header} from "./Header";
import LiveNow from "./Live";
import Hot from "./Hot";
import Upcoming from "./Upcoming";
import Past from "./Past";
import Popular from "./Popular";
import Footer from "./Footer";
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="site-wrapper">
                <Header></Header>

                <div className="main-wrapper">
                    <section className="banner-section">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <div className="banner-left-content">
                                            <h1>DISCOVER THE LATEST #NFT INDUSTRY NEWS, DISCUSSIONS, AND ALFA</h1>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="banner-right-content">
                                            <div className="row">
                                                <div className="col-7">
                                                    <div className="banner-sub-content">
                                                        <h4>NFT TOTAL MARKET CAP</h4>
                                                        <h2>$18.76b</h2>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="banner-sub-content text-end">
                                                        <h4>24h VOLUME</h4>
                                                        <h3>$146.23m</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="wave-image">
                                                <img src="/images/wave-image.png" alt="Wave Image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="card-section">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="row">

                                    <LiveNow></LiveNow>

                                    <div className="col-lg-8 col-md-12">
                                        <div className="right-area-main">
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <Hot></Hot>
                                                </div>
                                                <div className="col-md-6">
                                                    <Upcoming></Upcoming>
                                                </div>
                                            </div>

                                            <div
                                                className="alert alert-success d-flex align-items-center justify-content-between mt-3"
                                                role="alert">
                                                <p className="d-flex align-items-center"><img src="/images/success-icon.svg"
                                                                                              alt="Success Icon"/> Have you
                                                    visited <b className="alert-link">#Quirksville</b> yet, anon?</p>
                                                <a href="#" className="alert-link">Get Quirky </a>
                                            </div>

                                            <div className="row g-3 mt-2">
                                                <div className="col-md-6">
                                                    <Past></Past>
                                                </div>
                                                <div className="col-md-6">
                                                    <Popular></Popular>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}