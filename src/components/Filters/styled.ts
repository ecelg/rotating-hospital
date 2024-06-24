import { Checkbox, Input } from "antd"
import styled from "styled-components"
export const StyledCheckboxGroup = styled<typeof Checkbox.Group>(Checkbox.Group)`
    .ant-checkbox-wrapper {
       font-size: 18px;
       @media screen and (max-width: 1500px) {
        font-size: 15px;
       }
    }
    .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &::after {
            transform:rotate(45deg) scale(1) translate(-50%, -70%)
        }
        @media screen and (max-width: 1500px) {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-70%, -70%)
            }
        }
    }
`
export const StyledCheckbox = styled<typeof Checkbox>(Checkbox)`
    .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &::after {
            transform:rotate(45deg) scale(1) translate(-50%, -70%)
        }
        @media screen and (max-width: 1500px) {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-70%, -70%)
            }
        }
    }
    .ant-checkbox-indeterminate {
        .ant-checkbox-inner {
            width: 20px;
            height: 20px;
            &::after {
                transform:rotate(45deg) scale(1) translate(-80%, 0%)
            }
            @media screen and (max-width: 1500px) {
                width: 15px;
                height: 15px;
                &::after {
                    transform:rotate(45deg) scale(.8) translate(-80%, -10%)
                }
        }
    }
    }
`;
export const StyledSearchBar = styled<typeof Input.Search>(Input.Search)`
    .ant-input {
        height: 50px;
        font-size: 20px;
        &::placeholder {
            font-size: 18px;
        }
        @media screen and (max-width: 1500px){
            height: 40px;
            font-size: 15px;
            &::placeholder {
                font-size: 15px;
            }
        }
    }
    .ant-input-group-addon {
        .ant-input-search-button {
            height: 50px;
            width: 60px;
            .anticon-search{
                font-size: 20px;
            }
        }
        @media screen and (max-width: 1500px){
            .ant-input-search-button {
                height: 40px;
                width: 40px;
            }
            
        }
    }
`