import { Form, Input, Select } from "antd";
import { Project, User } from "types";

interface SearchFormProps {
  param: Pick<Project, "name" | "personId">;
  setParam: (param: SearchFormProps["param"]) => void;
  users: User[];
}

const SearchForm = ({ param, setParam, users }: SearchFormProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="项目名"
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          onChange={(value) => {
            setParam({ ...param, personId: Number(value) });
          }}
          placeholder="负责人"
          allowClear
        >
          {users.map((user) => (
            <Select.Option value={user.id} key={user.name}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
