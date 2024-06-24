import { Checkbox, Input, Divider } from "antd"
import styled from "styled-components"
export const StyledCheckboxGroup = styled<typeof Checkbox.Group>(Checkbox.Group)`
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
`
export const StyledCheckbox = styled<typeof Checkbox>(Checkbox)`
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
                transform:rotate(45deg) scale(.8) translate(-80%, 0%)
            }
        }
    }
`;
export const StyledSearchBar = styled<typeof Input.Search>(Input.Search)`
    .ant-input {
        height: 40px;
        font-size: 20px;
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
    margin: 0 !important;
`