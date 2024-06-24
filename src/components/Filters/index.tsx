'use client'
import React, {useEffect, useState} from 'react';
import { StyledCheckboxGroup, StyledSearchBar, StyledCheckbox, StyledDivider } from './styled';
import type { CheckboxProps } from 'antd';
import _ from 'lodash';

type FiltersPropsType = {
    hospitals: IHospital[];
    setHospitals: (hospitals: IHospital[]) => void;
    viewState: IViewState
    setViewState: (newViewState: IViewState) => void;
}
const Filters: React.FC<FiltersPropsType> = ({hospitals, setHospitals, viewState, setViewState}) => {

    const [countriesOptions, setCountriesOptions] = useState<string[]>([]);
    const [healthcareGroupsOptions, setHealthcareGroupsOptions] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedHealthcareGroups, setSelectedHealthcareGroups] = useState<string[]>([]);
    const checkAllCountries = selectedCountries.length === countriesOptions.length;
    const checkAllHCGs = selectedHealthcareGroups.length == healthcareGroupsOptions.length;
    const indeterminateCountries = selectedCountries.length > 0 && selectedCountries.length < countriesOptions.length;
    const indeterminateHCGs = selectedHealthcareGroups.length > 0 && selectedHealthcareGroups.length < healthcareGroupsOptions.length;

    const onCheckAllCountriesChange: CheckboxProps['onChange'] = (e) => {
        setSelectedCountries(e.target.checked ? countriesOptions : []);
    };
    const onCheckAllHCGsChange: CheckboxProps['onChange'] = (e) => {
        setSelectedHealthcareGroups(e.target.checked ? healthcareGroupsOptions : []);
  };
    const onChangingSelectedCountries = (selections: string[]) => {
        setSelectedCountries(selections);
        setHospitals(hospitals.filter(h => selections.includes(h.Country) ))
    }
    const onChangingSelectedHCGs = (selections: string[]) => {
        setSelectedHealthcareGroups(selections);
        setHospitals(hospitals.filter(h => selections.includes(h.HealtcareGroupName) ))

    }
    useEffect(() => {
        const distinctCountries = _.uniq(_.map(hospitals, 'Country'))
        setCountriesOptions(distinctCountries.sort())
        setSelectedCountries(distinctCountries)
        const distinctHealthcareGroups = _.uniq(_.map(hospitals, 'HealtcareGroupName'))
        setHealthcareGroupsOptions(distinctHealthcareGroups.sort())
        setSelectedHealthcareGroups(distinctHealthcareGroups)
    },[])
    const changeViewState = (value: string) => {
        const target = hospitals.find((hospital: IHospital) => hospital.SiteName.toLowerCase().includes(value.toLowerCase()))
        if (target) {
            setViewState({latitude: target.Latitude, longitude: target.Longitude, zoom: 15})
        }
    }
    return (
        <div className='w-1/5 h-full px-4 lg:px-6 2xl:px-10 py-10 flex flex-col gap-3 rounded-lg bg-white shadow-lg'>
            <StyledSearchBar placeholder='Enter a hospital name' onSearch={(value) => changeViewState(value)}/>
            <StyledDivider>Countries and Regions</StyledDivider>
            <StyledCheckbox indeterminate={indeterminateCountries} onChange={onCheckAllCountriesChange} checked={checkAllCountries}>
                <span className='lg:text-md 2xl:text-lg font-bold'>Check all</span>
            </StyledCheckbox>
            <div className='max-h-1/5 overflow-scroll no-scrollbar'>
                <div>
                    <StyledCheckboxGroup
                        options={countriesOptions}
                        defaultValue={selectedCountries}
                        value={selectedCountries}
                        onChange={e => onChangingSelectedCountries(e as string[])}
                        className='flex flex-col' />
                </div>
            </div>
            <StyledDivider>Healthcare Groups</StyledDivider>
            <StyledCheckbox indeterminate={indeterminateHCGs} onChange={onCheckAllHCGsChange} checked={checkAllHCGs}>
                <span className='lg:text-md 2xl:text-lg font-bold'>Check all</span>
            </StyledCheckbox>
            <div className='h-2/5 overflow-scroll no-scrollbar'>
                <div>
                    <StyledCheckboxGroup
                        options={healthcareGroupsOptions}
                        defaultValue={selectedHealthcareGroups}
                        value={selectedHealthcareGroups}
                        onChange={e => onChangingSelectedHCGs(e as string[])}
                        className='flex flex-col' />
                </div>
            </div>
        </div>
    )
}

export default Filters;