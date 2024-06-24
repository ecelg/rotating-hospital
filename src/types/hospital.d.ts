interface IHospital {
    Index: number;
    Country: string;
    HealtcareGroupName: string;
    NumOfSites: number;
    SiteName: string;
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