// Components
import { Form, Input } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useAddProject } from "page-hooks/project";
import useProjectModal from "hooks/useProjectModal";

// Types
import { ModalFormProps } from "./modalFormProps";

// Form validate
import validateRules from "./validateRules";

const CreateProjectForm = (props: ModalFormProps) => {
  const { mutateAsync } = useAddProject();
  const { closeModal } = useProjectModal();

  const onFinish = (values: any) => {
    mutateAsync(values).then(() => {
      props.form.resetFields();
      closeModal();
    });
  };

  // 表单验证错误时取消 modal button loading
  const onFinishFailed = () => {
    props.setConfirmLoading(false);
  };

  return (
    <Form
      name="createProject"
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
  );
};

export default CreateProjectForm;
