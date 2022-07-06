import React from "react"
class Footer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <footer>
                <div className="footer-box text-center">
                    <div className="logo">
                        <a href="#"><img src="images/logo.png" alt="NFTSpaces"/></a>
                    </div>
                    <p>Copyright NFTSpaces 2022 - All RIghts Reserved</p>
                </div>
            </footer>
        );
    }

}

export default Footer;