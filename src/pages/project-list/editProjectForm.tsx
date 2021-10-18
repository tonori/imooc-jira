// Components
import { Form, Input, Spin } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { useEditProject, useGetSingleProject } from "page-hooks/project";
import useProjectModal from "hooks/useProjectModal";
import useDocumentTitle from "hooks/useDocumentTitle";

// Types
import { ModalFormProps } from "./modalFormProps";

// Form validate
import validateRules from "./validateRules";

const EditProjectForm = (props: ModalFormProps) => {
  useDocumentTitle("编辑项目");

  const { params } = useRouteMatch<{ projectId: string }>();
  const id = Number(params.projectId);
  const { data: initialValues, isLoading } = useGetSingleProject(id);
  const { mutate } = useEditProject();
  const { closeModal } = useProjectModal();

  const onFinish = (values: any) => {
    mutate({ id, ...values });
    props.form.resetFields();
    closeModal();
  };

  // 表单验证错误时取消 modal button loading
  const onFinishFailed = () => {
    props.setConfirmLoading(false);
  };

  useEffect(() => {
    props.form.setFieldsValue(initialValues);
  }, [props.form, initialValues]);

  // 加载项目详情数据时同步 modal button loading
  useEffect(() => {
    props.setConfirmLoading(isLoading);
  }, [props, isLoading]);

  return (
    <Spin spinning={isLoading} delay={200}>
      <Form
        name="editProject"
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        preserve={false}
        {...props}
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
