import React, { Component, useState } from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import { useSelector } from 'react-redux'
import { userSelector } from "../features/user/userSlice"
import { spaceRemind } from "../apis/twitterAPI";

const UpcomingListing = (props) => {

    const { userInfo } = useSelector(userSelector);
    const [hide, setHide] = useState(false);

    const handleRemind = (spaceId) => {
        spaceRemind(userInfo, spaceId).then(res => {
            setHide(true);
        });
    }

    return (
        <>
        {!hide &&
            <div className="card mb-3" key={props.i}>
                <div className="row align-items-center g-0">
                    <div className="col-3">
                        <img src={props.obj.user ? props.obj.user.profile_image_url : '/images/panda-image.png'} className="img-fluid round-img" alt="Avatar" />
                    </div>
                    <div className="col-9">
                        <div className="card-body">
                        <a href="#" className="card-title">{props.obj.title}</a>
                            <div className="row align-items-center g-0">
                                <div className="col-8">
                                    <p className="card-text">
                                    <Moment format="ddd, MMM D hh:mm A">{props.obj.scheduled_start}</Moment>
                                    </p>
                                    <p className="card-text">Host: <a href="#">{props.obj.user ? props.obj.user.name : '-'}</a></p>
                                </div>
                            <div className="col-4 text-end">
                            <button className="btn btn-secondary" onClick={() => handleRemind(props.obj._id)}>Remind</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default UpcomingListing;