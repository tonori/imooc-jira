// Components
import { Link } from "react-router-dom";
import { Title } from "unauthenticated-app";
import { Form, Input, Button } from "antd";

// Hooks
import { useAuth } from "auth";
import useAsync from "utils/use-async";

const LoginScreen = () => {
  const { login } = useAuth();
  const { run, isPending } = useAsync();

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values));
  };

  return (
    <div>
      <Title>请登录</Title>
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
        <Form.Item>
          <Button
            loading={isPending}
            htmlType="submit"
            type="primary"
            className="d-block w-100"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Link to="/register" replace>
        没有账号？注册新账号
      </Link>
    </div>
  );
};

export default LoginScreen;
