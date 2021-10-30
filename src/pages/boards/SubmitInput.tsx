import { Input as _Input } from "antd";
import styled from "@emotion/styled";
import { EnterOutlined } from "@ant-design/icons";

import { SearchProps } from "antd/es/input";

interface Props extends Omit<SearchProps, "onSearch" | "loading" | "onSubmit"> {
  loading: SearchProps["loading"];
  onSubmit: SearchProps["onSearch"];
}

const SubmitInput = ({ loading, onSubmit, ...props }: Props) => (
  <Input
    loading={loading}
    allowClear={!loading}
    enterButton={loading ? <span /> : <EnterOutlined />}
    onSearch={onSubmit}
    {...props}
  />
);

const Input = styled(_Input.Search)`
  .ant-input-search-button {
    padding: 0 10px;
  }
`;

export default SubmitInput;
