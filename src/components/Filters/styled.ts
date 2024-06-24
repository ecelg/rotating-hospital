import { Checkbox, Input } from "antd"
import styled from "styled-components"
export const StyledCheckboxGroup = styled<typeof Checkbox.Group>(Checkbox.Group)`
    .ant-checkbox-wrapper {
       font-size: 25px;
       @media screen and (max-width: 1500px) {
        font-size: 15px;
       }
    }
    .ant-checkbox-inner {
        width: 25px;
        height: 25px;
        &::after {
            transform:rotate(45deg) scale(1) translate(-30%, -80%)
        }
        @media screen and (max-width: 1500px) {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-60%, -60%)
            }
        }
    }
`
export const StyledCheckbox = styled<typeof Checkbox>(Checkbox)`
    .ant-checkbox-inner {
        width: 25px;
        height: 25px;
        &::after {
            transform:rotate(45deg) scale(1) translate(-30%, -80%)
        }
        @media screen and (max-width: 1500px) {
            width: 15px;
            height: 15px;
            &::after {
                transform:rotate(45deg) scale(.8) translate(-60%, -60%)
            }
        }
    }
    .ant-checkbox-indeterminate {
        .ant-checkbox-inner {
            width: 25px;
            height: 25px;
            &::after {
                transform:rotate(45deg) scale(1) translate(-80%, -20%)
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
            font-size: 20px;
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