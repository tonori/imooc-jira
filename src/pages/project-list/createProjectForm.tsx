// Components
import { Form, FormProps, Input } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useAddProject } from "page-hooks/project";
import useProjectModal from "hooks/useProjectModal";

const CreateProjectForm = (props: FormProps) => {
  const { mutateAsync } = useAddProject();
  const { closeModal } = useProjectModal();
  const onFinish = (values: any) => {
    mutateAsync(values).then(() => {
      props?.form?.resetFields();
      closeModal();
    });
  };
  return (
    <Form
      name="createProject"
      labelCol={{ span: 4 }}
      onFinish={onFinish}
      preserve={false}
      {...props}
    >
      <Form.Item label="项目名称" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="负责部门" name="organization">
        <Input />
      </Form.Item>
      <Form.Item label="负责人" name="personId">
        <ProjectUserSelect placeholder="请选择" />
      </Form.Item>
    </Form>
  );
};

export default CreateProjectForm;
