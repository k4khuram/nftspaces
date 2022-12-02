import React, { Component } from "react";
import Listing from './UpcomingListing';

const Upcoming = (props) => {
    return (
        <div className="cards-mian">
            <h2 className="heading-h2">👀 UPCOMING</h2>
            <div className="space-cards">
                {props.spaces.map((obj, i) =>
                    <Listing obj={obj} i={i} />
                )}
            </div>

            <div className="text-end">
                {/* <a href="#" className="see-more">see more</a> */}
            </div>
        </div>
    );
}

export default Upcoming;