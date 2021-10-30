import { Modal, ModalFuncProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type DeleteConfirmProps = (
  name: string,
  onOk: ModalFuncProps["onOk"],
  onCancel: ModalFuncProps["onCancel"]
) => void;

const createDeleteConfirm = (props: ModalFuncProps): void => {
  const { confirm } = Modal;

  confirm({
    icon: <ExclamationCircleOutlined />,
    okText: "确认",
    okType: "danger",
    cancelText: "取消",
    ...props,
  });
};

export const deleteTaskConfirm: DeleteConfirmProps = (name, onOk, onCancel) => {
  const confirmProps: ModalFuncProps = {
    title: (
      <p>
        确定删除任务 <span className="color-danger">{name}</span> 吗？
      </p>
    ),
    content: "确认后任务将被删除，此操作不可恢复",
    onOk,
    onCancel,
    afterClose: onCancel,
  };

  createDeleteConfirm(confirmProps);
};

export const deleteProjectConfirm: DeleteConfirmProps = (
  name,
  onOk,
  onCancel
) => {
  const confirmProps: ModalFuncProps = {
    title: (
      <p>
        确定删除项目 <span className="color-danger">{name}</span> 吗？
      </p>
    ),
    content: "确认后项目将被删除，此操作不可恢复",
    onOk,
    onCancel,
    afterClose: onCancel,
  };

  createDeleteConfirm(confirmProps);
};

export const deleteBoardConfirm: DeleteConfirmProps = (
  name,
  onOk,
  onCancel
) => {
  const confirmProps: ModalFuncProps = {
    title: (
      <p>
        确定删除看板 <span className="color-danger">{name}</span>吗？{" "}
      </p>
    ),
    content: "确认后看板将被删除，此操作不可恢复",
    onOk,
    onCancel,
    afterClose: onCancel,
  };

  createDeleteConfirm(confirmProps);
};

export const deleteTaskGroupConfirm: DeleteConfirmProps = (
  name,
  onOk,
  onCancel
) => {
  const confirmProps: ModalFuncProps = {
    title: (
      <p>
        确定删除任务组 <span className="color-danger">{name}</span> 吗？{" "}
      </p>
    ),
    content: "确认后任务组将被删除，此操作不可恢复",
    onOk,
    onCancel,
    afterClose: onCancel,
  };

  createDeleteConfirm(confirmProps);
};
