import React from "react";
import ContactImage from "../../../static/assets/images/contact/contact-banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <div className="content-page-wrapper">
            <div
                className="left-column"
                style={{
                    background: "url(" + ContactImage + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="right-column">
                <p>
                    <FontAwesomeIcon className="icon" icon="phone-square-alt" />
                    <a href="tel:8016365262">+1 801-636-5262</a>
                    <br />
                    <FontAwesomeIcon className="icon" icon="map-marked-alt" />
                    <a href="https://www.google.com/maps/place/Pleasant+Grove,+UT/@40.3792082,-111.7686869,13z/data=!3m1!4b1!4m5!3m4!1s0x874d841f419bc7e7:0xa6bd1ff2b4bd2c1e!8m2!3d40.3641184!4d-111.73854">
                        Pleasent Grove, UT
                    </a>
                    <br />
                    <FontAwesomeIcon className="icon" icon="envelope-square" />
                    <a href="mailto:ullerbri000@gmail.com">
                        ullerbri000@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
}
