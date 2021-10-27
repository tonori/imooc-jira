import { Form, FormProps, Input, Modal, ModalProps, Spin } from "antd";
import { useHistory, useRouteMatch } from "react-router";
import { useBoardsCURD } from "page-hooks/boards";
import { useEffect, useMemo } from "react";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import { Board } from "types/boards";

const EditBoardModal = () => {
  const { path, params } = useRouteMatch<{ boardId: string; 0: string }>();
  const boardId = Number(params.boardId) || undefined;

  const { useGetItemById: useGetBoardById, useEditItem: useEditBoard } =
    useBoardsCURD();
  const { data, isLoading: getLoading } = useGetBoardById<Board>(
    ["board", { id: boardId }],
    boardId
  );
  const { mutate, isLoading: mutateLoading } = useEditBoard();
  const isLoading = getLoading || mutateLoading;

  const [formInstance] = Form.useForm();
  useEffect(() => {
    !getLoading && formInstance.setFieldsValue(data);
  });

  const onFinish = (values: any) => {
    mutate({ id: boardId, ...values });
    closeModal();
  };

  const history = useHistory();
  const projectId = useProjectIdInParam();
  const action = params["0"];
  const closeModal = () => history.push(`/projects/${projectId}/boards`);
  const visible = useMemo(
    () => path === "/projects/:projectId/board/:boardId/*" && action === "edit",
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
    title: "编辑看板",
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
            label="看板名称"
            rules={[{ required: true, message: "看板名称不能为空" }]}
          >
            <Input allowClear />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditBoardModal;
