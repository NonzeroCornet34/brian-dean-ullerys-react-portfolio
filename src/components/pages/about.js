import React from "react";
import ProfilePicture from "../../../static/assets/images/bio/photo.jpg";

export default function () {
    return (
        <div className="content-page-wrapper">
            <div
                className="left-column"
                style={{
                    background: "url(" + ProfilePicture + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="right-column">
                <p>
                    My name is Brian Dean Ullery. I currently live in Pleasant
                    Grove, Utah. I love programming and I love tackling a good
                    challenge (Such as this page). I am 13 years old and have
                    been coding since age 4. I have 2 sisters and a wonderful
                    mother and father. I love watching Star Trek, playing
                    Minecraft and Magic The Gathering. I am also an indie
                    developer with the developer name "NonzeroCornet34", and I'm
                    working on a game called Chop Chop City.
                </p>
            </div>
        </div>
    );
}
