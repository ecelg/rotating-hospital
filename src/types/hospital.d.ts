interface IHospital {
  Index: number;
  Country: string;
  HealthcareGroupName: string;
  NumOfSites: number;
  SiteName: string;
  NumOfOutpatientVisits: number;
  NumOfInpatientVisits: number;
  Beds: number;
  TrakProduct: string;
  Latitude: number;
  Longitude: number;
}

interface IViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}
