// Components
import { Form, Input } from "antd";
import ProjectUserSelect from "components/projectUserSelect";

// Hooks
import { useProjectCURD } from "page-hooks/project";
import useDocumentTitle from "hooks/useDocumentTitle";

// Types
import ModalFormProps from "types/modalFormProps";

// Form validate
import validateRules from "./validateRules";

const CreateProjectForm = ({
  form: formInstance,
  setConfirmLoading,
  closeModal,
}: ModalFormProps) => {
  useDocumentTitle("新建项目");

  const { useAddItem: useAddProject } = useProjectCURD();
  const { mutateAsync } = useAddProject();

  const onFinish = (values: any) => {
    mutateAsync(values).then(() => {
      formInstance.resetFields();
      closeModal();
    });
  };

  // 表单验证错误时取消 modal button loading
  const onFinishFailed = () => {
    setConfirmLoading(false);
  };

  return (
    <Form
      form={formInstance}
      name="createProject"
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
  );
};

export default CreateProjectForm;
