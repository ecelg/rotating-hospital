import _ from "lodash";
export const sampleHospital = {
  Index: 1,
  Country: "Country",
  HealthcareGroupName: "HealthcareGroupName",
  NumOfSites: 1,
  SiteName: "SiteName",
  Beds: 1,
  TrakProduct: "TrakProduct",
  NumOfOutpatientVisits: -1,
  NumOfInpatientVisits: -1,
  Latitude: -1.0,
  Longitude: 100.0,
};
export function hasAllIHospitalFields(obj: any): boolean {
  // Check each field in IHospital
  const fields = _.keys(sampleHospital);
  for (let i = 0; i < fields.length; i++) {
    let key = fields[i];
    if (!(key in obj) || (key in obj && obj[key] === "")) {
      return false;
    }
  }
  return true;
}
