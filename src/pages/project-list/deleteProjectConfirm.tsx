import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const createDeleteProjectConfirm = (
  projectName: string,
  deleteFunc: () => Promise<any>
) => {
  const { confirm } = Modal;
  confirm({
    title: (
      <p>
        确定删除项目 <span style={{ color: "#ff4d4f" }}>{projectName}</span>{" "}
        吗？
      </p>
    ),
    icon: <ExclamationCircleOutlined />,
    content: "确认后项目中的所有数据都将被删除，此操作不可恢复。",
    okText: "确认",
    okType: "danger",
    cancelText: "取消",
    onOk: deleteFunc,
  });
};

export default createDeleteProjectConfirm;
