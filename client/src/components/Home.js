import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { LiveNow } from "./Live";
import Hot from "./Hot";
import Upcoming from "./Upcoming";
import Past from "./Past";
import Popular from "./Popular";
import Footer from "./Footer";
import { marketCapsVolumes } from "../apis/graphAPI";
import { getSpaces } from "../apis/twitterAPI";
import ApexChart from './ApexChart';
import { useSelector } from 'react-redux'
import { userSelector } from "../features/user/userSlice"

const Home = () => {
    
    const { userInfo } = useSelector(userSelector);
    const [isChart, setIsChart] = useState(false);
    const [capsTotal, setCapsTotal] = useState(0);
    const [volumesTotal, setVolumesTotal] = useState(0);
    const [caps, setCaps] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [categories, setcategories] = useState([]);
    const [spacesList, setSpacesList] = useState([]);

    useEffect(() => {

        const resp = marketCapsVolumes().then((result) => {
            console.log(result);
            result = result.data;

            setCapsTotal(convertCurrency(result.caps_total));
            setVolumesTotal(convertCurrency(result.volumes_total));
            setCaps(result.caps);
            setVolumes(result.volumes);
            setcategories(result.date_time);
            setIsChart(true);
        })

        // alert(resp);

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         accept: 'application/json',
        //         'X-API-KEY': 'b649f473-6886-4668-97fb-15a8ec49ee97'
        //     }
        // };

        // fetch('https://data-api.nftgo.io/eth/v1/market/chart/marketcap?start_time=2022-11-08T00%3A00%3A00%2B00%3A00&end_time=2022-11-09T00%3A00%3A00%2B00%3A00', options)
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .catch(err => console.error(err));

        getSpaces('NFT', 'all', userInfo).then(res => {
            setSpacesList(res.data);
        })
    }, [])

    const convertCurrency = (labelValue) => {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? Math.round(Math.abs(Number(labelValue)) / 1.0e+9 * 100) / 100 + "b"
            // Six Zeroes for Millions 
            : Math.round(Math.abs(Number(labelValue)) >= 1.0e+6 * 100) / 100

                ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6 * 100) / 100 + "m"
                // Three Zeroes for Thousands
                : Math.round(Math.abs(Number(labelValue)) >= 1.0e+3 * 100) / 100

                    ? Math.round(Math.abs(Number(labelValue)) / 1.0e+3 * 100) / 100 + "k"

                    : Math.round(Math.abs(Number(labelValue)) * 100) / 100;
    }

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
                                                    <h4>MARKET CAP (24h)</h4>
                                                    <h2>${capsTotal}</h2>
                                                </div>
                                            </div>
                                            <div className="col-5">
                                                <div className="banner-sub-content text-end">
                                                    <h4>VOLUME (24h)</h4>
                                                    <h3>${volumesTotal}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wave-image">
                                            {isChart &&
                                                <ApexChart volumes={volumes} caps={caps} categories={categories} />
                                            }
                                            {/* <img src="/images/wave-image.png" alt="Wave Image" /> */}
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

                                {spacesList.live &&
                                    <LiveNow spaces={spacesList.live} />
                                }

                                <div className="col-lg-8 col-md-12">
                                    <div className="right-area-main">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                {spacesList.trending &&
                                                    <Hot spaces={spacesList.trending} />
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {spacesList.scheduled &&
                                                    <Upcoming spaces={spacesList.scheduled}></Upcoming>
                                                }
                                            </div>
                                        </div>

                                        <div
                                            className="alert alert-success d-flex align-items-center justify-content-between mt-3"
                                            role="alert">
                                            <p className="d-flex align-items-center"><img src="/images/success-icon.svg"
                                                alt="Success Icon" /> Have you
                                                visited <b className="alert-link">#Quirksville</b> yet, anon?</p>
                                            <a href="#" className="alert-link">Get Quirky </a>
                                        </div>

                                        <div className="row g-3 mt-2">
                                            <div className="col-md-6">
                                                {spacesList.past &&
                                                    <Past spaces={spacesList.past}></Past>
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                {spacesList.popular &&
                                                    <Popular spaces={spacesList.popular} />
                                                }
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
    )
}

export default Home