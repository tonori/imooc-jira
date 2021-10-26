// Components
import { Form, FormProps, Input, Modal, ModalProps, Spin } from "antd";
import ProjectUserSelect from "components/projectUserSelect";
import TaskTypeSelect from "components/TaskTypeSelect";
// Hooks
import { useHistory, useRouteMatch } from "react-router";
import { useEffect, useMemo } from "react";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { useTaskCURD } from "page-hooks/task";
// Types
import { Board } from "types/boards";

const EditTaskModal = () => {
  const { path, params } = useRouteMatch<{ taskId: string; 0: string }>();
  const boardId = Number(params.taskId) || undefined;
  const action = params["0"];

  const { useGetItemById: useGetTaskById, useEditItem: useEditTask } =
    useTaskCURD();
  const { data, isLoading: getLoading } = useGetTaskById<Board>(
    ["board", { id: boardId }],
    boardId
  );
  const { mutateAsync, isLoading: mutateLoading } = useEditTask();
  const isLoading = getLoading || mutateLoading;

  const [formInstance] = Form.useForm();
  useEffect(() => {
    !getLoading && formInstance.setFieldsValue(data);
  });

  const onFinish = (values: any) =>
    mutateAsync({ id: boardId, ...values }).then(() => {
      formInstance.resetFields();
      closeModal();
    });

  const history = useHistory();
  const projectId = useProjectIdInParam();
  const closeModal = () => history.push(`/projects/${projectId}/boards`);
  const visible = useMemo(
    () => path === "/projects/:projectId/task/:taskId/*" && action === "edit",
    [path, action]
  );

  const modalProps: ModalProps = {
    visible,
    forceRender: true,
    destroyOnClose: true,
    onOk: () => formInstance.submit(),
    onCancel: closeModal,
    confirmLoading: isLoading,
    okText: "确定",
    cancelText: "退出",
    title: "编辑任务",
  };

  const formProps: FormProps = {
    form: formInstance,
    labelCol: { span: 4 },
    preserve: false,
    onFinish,
  };

  return (
    <Modal {...modalProps}>
      <Spin delay={200} spinning={isLoading}>
        <Form {...formProps}>
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: "任务名称不能为空" }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="processorId"
            label="负责人"
            rules={[{ required: true, message: "必须指定负责人" }]}
          >
            <ProjectUserSelect placeholder="请选择" allowClear />
          </Form.Item>
          <Form.Item
            name="typeId"
            label="任务类型"
            rules={[{ required: true, message: "必须选择任务类型" }]}
          >
            <TaskTypeSelect placeholder="请选择" allowClear />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditTaskModal;
