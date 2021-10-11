import { ComponentProps } from "react";
import { Rate } from "antd";

interface PinProps extends ComponentProps<typeof Rate> {
  active: boolean;
  changeActive?: (active: boolean) => void;
}

const Pin = ({ active, changeActive, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={active ? 1 : 0}
      onChange={(num) => changeActive?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin;
