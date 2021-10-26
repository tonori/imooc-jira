// Components
import { Form, Input, Spin } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useEffect } from "react";
import { useProjectCURD } from "page-hooks/project";
import { useProjectIdInParam } from "page-hooks/useProjectIdInParam";
import useDocumentTitle from "hooks/useDocumentTitle";

// Types
import ModalFormProps from "types/modalFormProps";
import { Project } from "types/project";

// Form validate
import validateRules from "./validateRules";

const EditProjectForm = ({
  form: formInstance,
  setConfirmLoading,
  closeModal,
}: ModalFormProps) => {
  useDocumentTitle("编辑项目");

  const projectId = useProjectIdInParam();
  const { useGetItemById: useGetSingleProject, useEditItem: useEditProject } =
    useProjectCURD();
  const { data: initialValues, isLoading } = useGetSingleProject<Project>(
    ["project", { id: projectId }],
    projectId
  );
  const { mutate: editProject } = useEditProject();

  const onFinish = (values: any) => {
    editProject({ id: projectId, ...values });
    formInstance.resetFields();
    closeModal();
  };

  // 表单验证错误时取消 modal button loading
  const onFinishFailed = () => {
    setConfirmLoading(false);
  };

  useEffect(() => {
    formInstance.setFieldsValue(initialValues);
  }, [formInstance, initialValues]);

  // 加载项目详情数据时同步 modal button loading
  useEffect(() => {
    setConfirmLoading(isLoading);
  }, [setConfirmLoading, isLoading]);

  return (
    <Spin spinning={isLoading} delay={200}>
      <Form
        form={formInstance}
        name="editProject"
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        preserve={false}
      >
        <Form.Item label="项目名称" name="name" rules={[validateRules["name"]]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="负责部门"
          name="organization"
          rules={[validateRules["organization"]]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="负责人"
          name="personId"
          rules={[validateRules["personId"]]}
        >
          <ProjectUserSelect placeholder="请选择" allowClear={false} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default EditProjectForm;
