import React from "react";

export const LiveNow = (props) => {

    return (
        <div className="col-lg-4">
            <div className="left-area-mian">
                <h2 className="heading-h2"><img src="/images/green-dot.png" alt="Green Dot" />Live now</h2>
                <div className="group-scroll">

                {props.spaces.map((obj, i) =>
                    <a href={obj.user.url} target="_blank">
                        <div className="group-main" key={i}>
                            <div className="live-main">
                                <div className="d-flex align-items-center live-icon-main">
                                    <img src="/images/live-icon.png" alt="Live" />
                                    <p>LIVE</p>
                                </div>
                                <div className="menu-icon">
                                    <i className="fas fa-ellipsis-h"></i>
                                </div>
                            </div>
                            <h2>{obj.title}</h2>
                            <div className="profiles-main">
                                <div className="profiles-sub">
                                    <div className="profiles">
                                        {/* <img src="/images/profile-image-1.png" alt="Profile Image" /> */}
                                    </div>
                                </div>
                                <p>{obj.participant_count} listening</p>
                            </div>
                            {obj.user &&
                                <div className="footer-main">
                                    <div className="footer-profiles">
                                        <div className="footer-profiles-main">
                                            <img src={obj.user.profile_image_url} alt="Profile Image" />
                                            <p>{obj.user.name}</p>
                                        </div>
                                        <div className="footer-profiles-main">
                                            <img src="/images/check-image.png" alt="Profile Image" />
                                            <p className="profile-card">Speaker</p>
                                        </div>
                                    </div>
                                    <h3>{obj.user.description}</h3>
                                </div>
                            }
                        </div>
                    </a>
                )}

                </div>
            </div>
        </div>
    )
}