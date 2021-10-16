// Components
import { Form, FormProps, Input, Spin } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useRouteMatch } from "react-router";
import { useEditProject, useGetSingleProject } from "page-hooks/project";
import useProjectModal from "hooks/useProjectModal";

// Utils
import { useEffect } from "react";

// Form validate
import validateRules from "./validateRules";

const EditProjectForm = (props: FormProps) => {
  const { params } = useRouteMatch<{ projectId: string }>();
  const id = Number(params.projectId);
  const { data: initialValues, isLoading } = useGetSingleProject(id);
  const { mutateAsync } = useEditProject();
  const { closeModal } = useProjectModal();

  const onFinish = (values: any) => {
    mutateAsync({ id, ...values }).then(() => {
      props?.form?.resetFields();
      closeModal();
    });
  };

  useEffect(() => {
    props?.form?.setFieldsValue(initialValues);
  }, [props.form, initialValues]);

  return (
    <Spin spinning={isLoading} delay={200}>
      <Form
        name="editProject"
        labelCol={{ span: 4 }}
        onFinish={onFinish}
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
