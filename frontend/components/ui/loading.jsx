import React from 'react';

export default function Elements() {
    const flame = window.redFlame;
    const tidal = window.blueTidal;
    const shock = window.yellowShock;
    const cloud = window.greenCloud;

    return (
        <div className="elements-loader-div">
                <img className="splash-img flame-icon floaty" src={flame} alt="" />
                <img className="splash-img tidal-icon floaty" src={tidal} alt="" />
                <img className="splash-img shock-icon floaty" src={shock} alt="" />
                <img className="splash-img cloud-icon floaty" src={cloud} alt="" />
        </div>
    )
}