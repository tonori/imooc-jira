// Components
import { Link } from "react-router-dom";
import { Title } from "unauthenticated-app";
import { Form, Input, Button } from "antd";

// Hooks
import { useAuth } from "context/auth-content";
import useAsync from "utils/use-async";

// Type
import { Rule } from "antd/es/form";

const RegisterScreen = () => {
  const { register } = useAuth();
  const { run, isPending } = useAsync();

  const confirmPasswordRules: Rule = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("两次输入的密码不一致！"));
    },
  });

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    run(register({ username, password }));
  };

  return (
    <div>
      <Title>请注册</Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          hasFeedback
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="用户名" type="text" />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "请确认密码" },
            confirmPasswordRules,
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isPending}
            htmlType="submit"
            type="primary"
            className="d-block w-100"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
      <Link to="/login" replace>
        已经有账号了？直接登录
      </Link>
    </div>
  );
};

export default RegisterScreen;
