"use client"
import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Popover } from "antd";
import {GlobalOutlined} from '@ant-design/icons'
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const MAP_STYLE = process.env.NEXT_PUBLIC_MAP_STYLE

type HospitalMapPropsType = {
    hospitals: IHospital[];
    viewState: IViewState
    setViewState: (newViewState: IViewState) => void;
}
const HospitalMap: React.FC<HospitalMapPropsType> = ({ hospitals, viewState, setViewState}) => {
    
    const redirectToGoogleEarth = (latitude: number, longitude: number) => {
        const altitude = 50; // Altitude in meters
        const heading = 90; // Camera direction in degrees (90 is east, adjust as needed for the front view)
        const tilt = 70; // Camera tilt in degrees to get a good front view
        const range = 200; // Distance from the point in meters

        // Construct the Google Earth URL for a zoomed-in view
        const url = `https://earth.google.com/web/@${latitude},${longitude},${altitude}a,${range}d,${tilt}y,${heading}h,60t,0r`;

        // Redirect to the constructed URL
        // window.location.href = url;
        window.open(url)
    };

    const getPopOverContent = (hospital: IHospital) => {
        return (
            <div className="text-lg">
                <div><strong>HealthCare Group Name: </strong>{hospital.HealtcareGroupName}</div>
                <div><strong>No. of Sites: </strong>{ hospital.NumOfSites}</div>
                <div><strong>Number of Beds: </strong>{hospital.Beds}</div>
                <div><strong>Trak Product: </strong>{hospital.TrakProduct}</div>
                <div className="text-blue-600 cursor-pointer hover:underline" onClick={() => redirectToGoogleEarth(hospital.Latitude, hospital.Longitude)}>
                    View Google Earth 3D&nbsp;&nbsp;<GlobalOutlined className="text-xl" />
                </div>
            </div>
        )
    }
    
    
    return (
        <div className="w-4/5 h-full rounded-lg overflow-clip">
            <Map
                {...viewState}
                mapboxAccessToken={TOKEN}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle={MAP_STYLE}
                scrollZoom={true}
                dragPan={true}
                dragRotate={true}
                doubleClickZoom={true}
            >
                <NavigationControl position="top-left" style={{'scale': '1.5', 'transform': 'translate(40%, 30%)'}} />
                
                <ScaleControl position="bottom-left" />
                
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    showAccuracyCircle={false}
                    style={{'scale':"1.5", 'transform': 'translate(40%, 200%)'}}
                />
                {hospitals.map((hospital, index) => {
                    return (
                        <Marker
                            key={index}
                            latitude={hospital.Latitude}
                            longitude={hospital.Longitude}
                            >
                            <Popover title={<strong className="text-xl">{hospital.SiteName}</strong>} content={ getPopOverContent(hospital)}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-12 fill-red-500">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </Popover>
                        </Marker>
                    )
                })}
            </Map>
        </div>
    )
}

export default HospitalMap;