import { Spin, SpinProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinOutlined = (props: SpinProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <Spin indicator={antIcon} delay={200} {...props} />;
};

export default SpinOutlined;
