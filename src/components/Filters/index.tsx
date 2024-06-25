"use client";
import React, { useEffect, useState } from "react";
import { StyledSearchBar, StyledCheckbox, StyledDivider } from "./styled";
import type { CheckboxProps } from "antd";
import { InputNumber, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import hospitalJson from "../../data/APAC_Hospitals.json";

type FiltersPropsType = {
  hospitals: IHospital[];
  setHospitals: (hospitals: IHospital[]) => void;
  viewState: IViewState;
  setViewState: (newViewState: IViewState) => void;
};

const Filters: React.FC<FiltersPropsType> = ({
  hospitals,
  setHospitals,
  setViewState,
}) => {
  const hospitalList: IHospital[] = hospitalJson;
  const beds = _.map(hospitalList, "Beds");
  const minBed = Math.min(...beds);
  const maxBed = Math.max(...beds);

  const [countriesOptions, setCountriesOptions] = useState<string[]>([]);
  const [healthcareGroupsOptions, setHealthcareGroupsOptions] = useState<
    string[]
  >([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [indeterminateCountries, setIndeterminateCountries] = useState<
    string[]
  >([]);
  const [selectedHCGs, setSelectedHCGs] = useState<string[]>([]);
  const [indeterminateHCGs, setIndeterminateHCGs] = useState<string[]>([]);
  const [bedRange, setBedRange] = useState<{ lo: number; hi: number }>({
    lo: minBed,
    hi: maxBed,
  });

  const checkAllCountries =
    selectedCountries.length === countriesOptions.length;
  const checkAllHCGs = selectedHCGs.length === healthcareGroupsOptions.length;

  const indeterminateAllCountries =
    selectedCountries.length > 0 &&
    selectedCountries.length < countriesOptions.length;
  const indeterminateAllHCGs =
    selectedHCGs.length > 0 &&
    selectedHCGs.length < healthcareGroupsOptions.length;

  const onCheckAllCountriesChange: CheckboxProps["onChange"] = (e) => {
    setHospitals(e.target.checked ? hospitalList : []);
  };

  const onCheckAllHCGsChange: CheckboxProps["onChange"] = (e) => {
    setHospitals(e.target.checked ? hospitalList : []);
  };

  const onChangeCountryCheckbox: CheckboxProps["onChange"] = (e) => {
    e.target.checked
      ? setHospitals(
          _.uniq(
            _.concat(
              hospitals,
              hospitalJson.filter((h) => h.Country == e.target.value)
            )
          )
        )
      : setHospitals(hospitals.filter((h) => h.Country !== e.target.value));
  };

  const onChangeHCGCheckbox: CheckboxProps["onChange"] = (e) => {
    e.target.checked
      ? setHospitals(
          _.uniq(
            _.concat(
              hospitals,
              hospitalJson.filter(
                (h) => h.HealthcareGroupName == e.target.value
              )
            )
          )
        )
      : setHospitals(
          hospitals.filter((h) => h.HealthcareGroupName !== e.target.value)
        );
  };

  const getCountryPopoverContent = (country: string) => {
    const hospitalsInCountry = hospitalList.filter((h) => h.Country == country);
    const hospitalGroups = _.uniq(
      _.map(hospitalsInCountry, "HealthcareGroupName")
    );
    return (
      <div className="flex flex-col gap-2">
        <div>
          <strong>No. Healthcare Groups:&nbsp;&nbsp;</strong>
          {hospitalGroups.length}
        </div>
      </div>
    );
  };
  const getHCGPopoverContent = (HCG: string) => {
    const hospitalsInHCG = hospitalList.filter(
      (h) => h.HealthcareGroupName == HCG
    );
    const bedCount = _.reduce(
      _.map(hospitalsInHCG, "Beds"),
      (prev: number, curr: number) => prev + curr
    );
    return (
      <div className="flex flex-col gap-2">
        <div>
          <strong>No. Hospitals:&nbsp;&nbsp;</strong>
          {hospitalsInHCG.length}
        </div>
        <div>
          <strong>No. Beds:&nbsp;&nbsp;</strong>
          {bedCount}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fullySelected = countriesOptions.filter((country) => {
      return (
        hospitals.filter((h) => h.Country === country).length ===
        hospitalList.filter((h) => h.Country === country).length
      );
    });

    const indeterminated = countriesOptions.filter((country) => {
      const totalHospitalsInCountry = hospitalList.filter(
        (h) => h.Country === country
      ).length;
      const selectedHospitalsInCountry = hospitals.filter(
        (h) => h.Country === country
      ).length;
      return (
        selectedHospitalsInCountry < totalHospitalsInCountry &&
        selectedHospitalsInCountry > 0
      );
    });
    setSelectedCountries(fullySelected);
    setIndeterminateCountries(indeterminated);
  }, [hospitals]);

  useEffect(() => {
    const fullySelected = healthcareGroupsOptions.filter((hcg) => {
      return (
        hospitals.filter((h) => h.HealthcareGroupName === hcg).length ===
        hospitalList.filter((h) => h.HealthcareGroupName === hcg).length
      );
    });

    const indeterminated = healthcareGroupsOptions.filter((hcg) => {
      const totalHospitalsInHCG = hospitalList.filter(
        (h) => h.HealthcareGroupName === hcg
      ).length;
      const selectedHospitalsInHCG = hospitals.filter(
        (h) => h.HealthcareGroupName === hcg
      ).length;
      return (
        selectedHospitalsInHCG < totalHospitalsInHCG &&
        selectedHospitalsInHCG > 0
      );
    });
    setSelectedHCGs(fullySelected);
    setIndeterminateHCGs(indeterminated);
  }, [hospitals]);

  useEffect(() => {
    const validHospitals = hospitalList.filter(
      (h) => h.Beds >= bedRange.lo && h.Beds <= bedRange.hi
    );
    setHospitals(validHospitals);
  }, [bedRange]);

  useEffect(() => {
    const distinctCountries = _.uniq(_.map(hospitalList, "Country"));
    setCountriesOptions(distinctCountries.sort());
    setSelectedCountries(distinctCountries);
    const distinctHealthcareGroups = _.uniq(
      _.map(hospitalList, "HealthcareGroupName")
    );
    setHealthcareGroupsOptions(distinctHealthcareGroups.sort());
    setSelectedHCGs(distinctHealthcareGroups);
  }, []);

  const changeViewState = (value: string) => {
    const target = hospitals.find((hospital: IHospital) =>
      hospital.SiteName.toLowerCase().includes(value.toLowerCase())
    );
    if (target) {
      setViewState({
        latitude: target.Latitude,
        longitude: target.Longitude,
        zoom: 15,
      });
    }
  };

  return (
    <div className="w-1/5 min-w-80 h-full px-4 lg:px-6 2xl:px-10 py-10 flex flex-col gap-3 
      rounded-lg bg-white shadow-lg overflow-y-scroll overflow-x-hidden
      scrollbar-corner-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full
      scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100">
      <StyledSearchBar
        placeholder="Enter a hospital name"
        onSearch={(value) => changeViewState(value)}
      />
      <StyledDivider>Countries and Regions</StyledDivider>
      <StyledCheckbox
        indeterminate={indeterminateAllCountries}
        onChange={onCheckAllCountriesChange}
        checked={checkAllCountries}
      >
        <span className="lg:text-md 2xl:text-lg font-bold">Check all</span>
      </StyledCheckbox>
      <div>
        <div className="flex flex-col">
          {countriesOptions.map((country, index) => (
            <StyledCheckbox
              key={index}
              value={country}
              checked={selectedCountries.includes(country)}
              indeterminate={indeterminateCountries.includes(country)}
              onChange={onChangeCountryCheckbox}
            >
              <div className="">
                <span className="mr-2">{country}</span>
                <Popover
                  placement="right"
                  content={getCountryPopoverContent(country)}
                >
                  <InfoCircleOutlined className="hover:text-blue-600" />
                </Popover>
              </div>
            </StyledCheckbox>
          ))}
        </div>
      </div>
      <StyledDivider>Healthcare Groups</StyledDivider>
      <StyledCheckbox
        indeterminate={indeterminateAllHCGs}
        onChange={onCheckAllHCGsChange}
        checked={checkAllHCGs}
      >
        <span className="lg:text-md 2xl:text-lg font-bold">Check all</span>
      </StyledCheckbox>
      <div>
        <div className="flex flex-col">
          {healthcareGroupsOptions.map((hcg, index) => (
            <StyledCheckbox
              key={index}
              value={hcg}
              checked={selectedHCGs.includes(hcg)}
              indeterminate={indeterminateHCGs.includes(hcg)}
              onChange={onChangeHCGCheckbox}
            >
              <div>
                <span className="mr-2">{hcg}</span>
                <Popover placement="right" content={getHCGPopoverContent(hcg)}>
                  <InfoCircleOutlined className="hover:text-blue-500" />
                </Popover>
              </div>
            </StyledCheckbox>
          ))}
        </div>
      </div>
      <StyledDivider>Number of Beds</StyledDivider>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex gap-2 justify-start items-center">
          <label>Lower Bound: </label>
          <InputNumber
            min={minBed}
            max={bedRange.hi}
            step={50}
            defaultValue={minBed}
            onChange={(value) =>
              setBedRange({ lo: value as number, hi: bedRange.hi })
            }
            changeOnWheel
          />
        </div>
        <div className="flex gap-2 justify-start items-center">
          <label>Upper Bound: </label>
          <InputNumber
            min={bedRange.lo}
            max={maxBed}
            step={50}
            defaultValue={maxBed}
            onChange={(value) =>
              setBedRange({ lo: bedRange.lo, hi: value as number })
            }
            changeOnWheel
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
