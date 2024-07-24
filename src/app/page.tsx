"use client";
import HospitalMap from "@/components/HospitalMap";
import Filters from "@/components/Filters";
import { useState, useEffect, useMemo } from "react";
import { Alert } from "antd";
import apac_hospitals from "../data/APAC_Hospitals.json";
import { hasAllIHospitalFields } from "@/util/typeCheck";
export default function Home() {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);
  const [staticHospitalList, setStaticHospitalList] = useState<IHospital[]>([]);
  const [viewState, setViewState] = useState({
    latitude: 20.02, // Set an initial latitude
    longitude: 110.3486, // Set an initial longitude
    zoom: 3,
  });
  const [showUploadAlert, setShowUploadAlert] = useState<boolean>(false);
  const [uploadAlertType, setUploadAlertType] = useState<"success" | "error">();
  const alertText = useMemo(() => {
    return uploadAlertType == "success"
      ? "File uploaded successfully, updating hospitals..."
      : "File upload failed, please double check the csv format!";
  }, [uploadAlertType]);
  // const retrieveHospitalData = async () => {
  //   const s3 = new aws.S3({
  //     credentials: {
  //       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
  //       secretAccessKey: process.env
  //         .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  //     },
  //     region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  //   });
  //   const params = {
  //     Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
  //     Key: process.env.NEXT_PUBLIC_AWS_JSON_FILE_NAME as string,
  //   };
  //   try {
  //     const data = await s3.getObject(params).promise();
  //     const json = JSON.parse(data.Body?.toString("utf-8") || "[]");
  //     console.log(json);
  //     const hospitalJson: IHospital[] = json.map((h: IHospital) => {
  //       if (!hasAllIHospitalFields(h)) {
  //         throw new Error();
  //       }
  //       if (h.Index) h.Index = Number(h.Index);
  //       if (h.Beds) h.Beds = Number(h.Beds);
  //       if (h.NumOfSites) h.NumOfSites = Number(h.NumOfSites);
  //       if (h.NumOfInpatientVisits)
  //         h.NumOfInpatientVisits = Number(h.NumOfInpatientVisits);
  //       if (h.NumOfOutpatientVisits)
  //         h.NumOfOutpatientVisits = Number(h.NumOfOutpatientVisits);
  //       if (h.Latitude) h.Latitude = Number(h.Latitude);
  //       if (h.Longitude) h.Longitude = Number(h.Longitude);
  //       return h;
  //     });
  //     console.log(hospitalJson);
  //     setStaticHospitalList(hospitalJson);
  //     setHospitals(hospitalJson);
  //   } catch (error) {
  //     setStaticHospitalList(fallbackHospitals);
  //     setHospitals(fallbackHospitals);
  //   }
  // };
  const processHospials = () => {
    const filteredHospitals: IHospital[] = [];
    apac_hospitals.forEach((h) => {
      if (hasAllIHospitalFields(h)) {
        filteredHospitals.push(h as IHospital);
      }
    });
    setStaticHospitalList(filteredHospitals);
    setHospitals(filteredHospitals);
  };
  useEffect(() => {
    processHospials();
  }, []);
  return (
    <main className="relative h-screen w-screen p-6 flex flex-row justify-end items-end gap-6 bg-gray-200">
      {showUploadAlert && (
        <Alert
          type={uploadAlertType}
          message={<strong>{alertText}</strong>}
          showIcon
          className="absolute top-4 z-10 right-1/2 translate-x-1/2"
        />
      )}
      <Filters
        hospitals={hospitals}
        staticHospitalList={staticHospitalList}
        setHospitals={setHospitals}
        viewState={viewState}
        setViewState={setViewState}
        setShowUploadAlert={setShowUploadAlert}
        setUploadAlertType={setUploadAlertType}
      />
      <HospitalMap
        hospitals={hospitals}
        viewState={viewState}
        setViewState={setViewState}
      />
    </main>
  );
}
