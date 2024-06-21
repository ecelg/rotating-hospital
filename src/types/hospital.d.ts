interface IHospital {
    Index: number;
    Hospital: string;
    Category: string;
    Latitude: number;
    Longitude: number;
    Type: string;
    Beds: number;
}

interface IViewState {
    latitude: number;
    longitude: number;
    zoom: number;
}