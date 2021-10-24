import { Input as _Input } from "antd";
import styled from "@emotion/styled";
import { EnterOutlined } from "@ant-design/icons";

import { SearchProps } from "antd/es/input";

interface Props extends Omit<SearchProps, "onSearch" | "loading"> {
  loading: SearchProps["loading"];
  onSearch: SearchProps["onSearch"];
}

const SubmitInput = (props: Props) => (
  <Input
    allowClear
    enterButton={props.loading ? "" : <EnterOutlined />}
    {...props}
  />
);

const Input = styled(_Input.Search)`
  .ant-input-search-button {
    padding: 0 10px;
  }
`;

export default SubmitInput;
