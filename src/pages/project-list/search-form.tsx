import { Form, Input } from "antd";
import ProjectUserSelect from "components/projectUserSelect";
import { User } from "types/user";
import { ProjectQueryParamProps } from "page-hooks/project";

interface SearchFormProps {
  param: ProjectQueryParamProps;
  setParam: (param: SearchFormProps["param"]) => void;
  users: User[];
}

const SearchForm = ({ param, setParam }: SearchFormProps) => {
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
        <ProjectUserSelect
          onChange={(value) => {
            setParam({ ...param, personId: Number(value) });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
