import React,{Component} from "react";

class Hot extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="cards-mian">
                <h2 className="heading-h2">🔥 HoT & TRENDING</h2>
                <div className="card mb-3">
                    <div className="row align-items-center g-0">
                        <div className="col-3">
                            <img src="/images/monkey-image.png" className="img-fluid"
                                 alt="Card Icon"/>
                        </div>
                        <div className="col-9">
                            <div className="card-body">
                                <a href="@/Components/HotTranding#" className="card-title">Trading Tuesday’s
                                    - Hosted by Quirkies Community</a>
                                <div className="row align-items-center g-0">
                                    <div className="col-8">
                                        <p className="card-text">Sat, Mar 21 at 8:00
                                            PM</p>
                                        <p className="card-text">Host: <a
                                            href="@/Components/HotTranding#">@nftpres</a></p>
                                    </div>
                                    <div className="col-4 text-end">
                                        <a href="@/Components/HotTranding#"
                                           className="btn btn-primary">Listen</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="row align-items-center g-0">
                        <div className="col-3">
                            <img src="/images/monkey-image.png" className="img-fluid"
                                 alt="Card Icon"/>
                        </div>
                        <div className="col-9">
                            <div className="card-body">
                                <a href="@/Components/HotTranding#" className="card-title">Trading Tuesday’s
                                    - Hosted by Quirkies Community</a>
                                <div className="row align-items-center g-0">
                                    <div className="col-8">
                                        <p className="card-text">Sat, Mar 21 at 8:00
                                            PM</p>
                                        <p className="card-text">Host: <a
                                            href="@/Components/HotTranding#">@nftpres</a></p>
                                    </div>
                                    <div className="col-4 text-end">
                                        <a href="@/Components/HotTranding#"
                                           className="btn btn-primary">Listen</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="row align-items-center g-0">
                        <div className="col-3">
                            <img src="/images/monkey-image.png" className="img-fluid"
                                 alt="Card Icon"/>
                        </div>
                        <div className="col-9">
                            <div className="card-body">
                                <a href="@/Components/HotTranding#" className="card-title">Trading Tuesday’s
                                    - Hosted by Quirkies Community</a>
                                <div className="row align-items-center g-0">
                                    <div className="col-8">
                                        <p className="card-text">Sat, Mar 21 at 8:00
                                            PM</p>
                                        <p className="card-text">Host: <a
                                            href="@/Components/HotTranding#">@nftpres</a></p>
                                    </div>
                                    <div className="col-4 text-end">
                                        <a href="@/Components/HotTranding#"
                                           className="btn btn-primary">Listen</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <a href="@/Components/HotTranding#" className="see-more">see more</a>
                </div>
            </div>

        );
    }

}

export default Hot;