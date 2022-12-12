import React from "react";
import Moment from 'react-moment';
import 'moment-timezone';

const Popular = (props)=>  {
    
        return(
            <div className="cards-mian">
                <h2 className="heading-h2">🚀 MOST POPULAR</h2>
                <div className="space-cards">
                    {props.spaces.map((obj, i) =>
                        <div className="card mb-3" key={i}>
                            <div className="row align-items-center g-0">
                                <div className="col-3">
                                    <img src={obj.user ? obj.user.profile_image_url : '/images/panda-image.png'} className="img-fluid round-img" alt="Avatar" />
                                </div>
                                <div className="col-9">
                                    <div className="card-body">
                                        <a href="#" className="card-title">{obj.title}</a>
                                        <div className="row align-items-center g-0">
                                            <div className="col-8">
                                                <p className="card-text">
                                                    <Moment format="ddd, MMM D hh:mm A">{obj.started_at}</Moment>
                                                </p>
                                                <p className="card-text">Host: <a href="#">{obj.user ? obj.user.name : '-'}</a></p>
                                            </div>
                                            {/* <div className="col-4 text-end">
                                                <a href="@/Components/HotTranding#"
                                                className="btn btn-primary">Listen</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-end">
                    {/* <a href="#" className="see-more">see more</a> */}
                </div>
            </div>

        );
    
}
export default Popular;