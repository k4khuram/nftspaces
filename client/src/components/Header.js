import Logo from "./logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ActionMenue } from "./ActionMenu";

export const Header = props =>{

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
                                    <button type="submit" className="btn btn-search">

                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-7 col-sm-7 col-7">
                            

                            <div className="twitter-button text-end">
                            <ActionMenue />
                            </div>


                        </div>

                        <div className="col-lg-6 col-md-12 d-block-md">
                            <div className="search-main">
                                <form action="@/Components/Header#" method="POST">
                                    <input type="text" className="form-control" name="search" id="search"
                                           placeholder="Search for NFT related Twitter Spaces">
                                    </input>
                                    <button type="submit" className="btn btn-search">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );


}