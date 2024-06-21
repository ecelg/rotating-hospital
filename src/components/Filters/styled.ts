import { Checkbox, Input } from "antd"
import styled from "styled-components"
export const StyledCheckboxGroup = styled<typeof Checkbox.Group>(Checkbox.Group)`
    .ant-checkbox-wrapper {
        font-size: 25px;
    }
    .ant-checkbox-inner {
        width: 25px;
        height: 25px
    }
`

export const StyledSearchBar = styled<typeof Input.Search>(Input.Search)`
    .ant-input {
        height: 50px;
        font-size: 20px;
        &::placeholder {
            font-size: 20px;
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
    }
`