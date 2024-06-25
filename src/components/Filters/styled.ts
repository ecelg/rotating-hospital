import { Checkbox, Input, Divider, Slider } from "antd"
import styled from "styled-components"
export const StyledCheckboxGroup = styled<typeof Checkbox.Group>(Checkbox.Group)`
    @media screen and (min-width: 1500px){
        .ant-checkbox-wrapper {
            font-size: 15px;
        }
        .ant-checkbox-inner {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-70%, -70%)
            }
        }
    }
`
export const StyledCheckbox = styled<typeof Checkbox>(Checkbox)`
   @media screen and (min-width: 1500px) {
        .ant-checkbox-inner {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-70%, -70%)
            }
        }
        .ant-checkbox-indeterminate {
            .ant-checkbox-inner {
                width: 15px;
                height: 15px;
                &::after {
                    transform: scale(.8) translate(-60%, -60%)
                }
            }
        }
    }
`;
export const StyledSearchBar = styled<typeof Input.Search>(Input.Search)`
    .ant-input {
        height: 40px;
        font-size: 15px;
        &::placeholder {
            font-size: 15px;
            transform: translateY(-15%);
        }
    }
    .ant-input-group-addon {
        .ant-input-search-button {
            height: 40px;
            width: 50px;
            .anticon-search{
                font-size: 20px;
            }
        }
    }
`

export const StyledDivider = styled<typeof Divider>(Divider)`
    margin: 5px !important;
    border-block-start-color: gray !important;
`