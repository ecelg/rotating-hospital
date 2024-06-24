'use client'
import HospitalMap from "@/components/HospitalMap";
import Filters from "@/components/Filters";
import hospitalsJson from '../data/APAC_Hospitals.json'
import { useState, useEffect } from "react";
export default function Home() {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [viewState, setViewState] = useState({
        latitude: 1.290270, // Set an initial latitude Singapore
        longitude: 103.851959, // Set an initial longitude Singapore
        zoom: 10
    });
  useEffect(() => {
    setHospitals(hospitalsJson);
    }, []);
  return (
    <main className="h-screen w-screen p-6 flex flex-row justify-end items-end gap-6 bg-gray-300">
      <Filters hospitals={hospitalsJson} setHospitals={setHospitals} viewState={viewState} setViewState={setViewState}/>
      <HospitalMap hospitals={hospitals} viewState={viewState} setViewState={setViewState}/>
    </main>
  );
}
