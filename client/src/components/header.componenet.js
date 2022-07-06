import React,{Component} from "react";
import Logo from "./logo";

class Header extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <header>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-5 col-sm-5 col-5 ">
                                <a href="/">
                                    <Logo className="logo" />
                                </a>
                            </div>
                            <div className="col-lg-6 col-md-12 d-none-md">
                                <div className="search-main">
                                    <form action="" method="POST">
                                        <input type="text" className="form-control" name="search" id="search"
                                               placeholder="Search for NFT related Twitter Spaces">
                                        </input>
                                        <button type="submit" className="btn btn-search"><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-7 col-sm-7 col-7">
                                <div className="twitter-button text-end">
                                    <a type="button" href="" className="btn twitter-btn"><i
                                        className="fa-brands fa-twitter"></i> Log In With Twitter
                                    </a>
                                    <button type="button" className="btn btn-primary d-block-md live-menu-open"><i
                                        className="fa-solid fa-bars"></i> Live now
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 d-block-md">
                                <div className="search-main">
                                    <form action="@/Components/Header#" method="POST">
                                        <input type="text" className="form-control" name="search" id="search"
                                               placeholder="Search for NFT related Twitter Spaces">
                                        </input>
                                        <button type="submit" className="btn btn-search"><i
                                            className="fa-solid fa-magnifying-glass"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;