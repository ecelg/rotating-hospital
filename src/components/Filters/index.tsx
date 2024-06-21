'use client'
import React from 'react';
import { StyledCheckboxGroup, StyledSearchBar } from './styled';
type FiltersPropsType = {
    hospitals: IHospital[];
    setHospitals: (hospitals: IHospital[]) => void;
    viewState: IViewState
    setViewState: (newViewState: IViewState) => void;
}
const Filters: React.FC<FiltersPropsType> = ({hospitals, setHospitals, viewState, setViewState}) => {
    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ];
    const changeViewState = (value: string) => {
        const target = hospitals.find((hospital: IHospital) => hospital.Hospital.includes(value))
        if (target) {
            setViewState({latitude: target.Latitude, longitude: target.Longitude, zoom: 15})
        }
    }
    return (
        <div className='w-1/5 h-full p-10 flex flex-col gap-5 rounded-lg bg-white'>
            <StyledSearchBar placeholder='Enter a hospital name' onSearch={(value) => changeViewState(value)}/>
            <div className='h-1/5 overflow-scroll no-scrollbar'>
                <div>
                    <StyledCheckboxGroup options={options} className='flex flex-col'/>
                </div>
            </div>
        </div>
    )
}

export default Filters;