import { Select } from "antd";
import { ComponentProps } from "react";
import { useGetProjectUsers } from "../page-hooks/projectUsers";

const ProjectUserSelect = (props: ComponentProps<typeof Select>) => {
  const { data: users } = useGetProjectUsers();
  return (
    <Select placeholder="负责人" allowClear {...props}>
      {users &&
        users.map((user) => (
          <Select.Option value={user.id} key={user.name}>
            {user.name}
          </Select.Option>
        ))}
    </Select>
  );
};

export default ProjectUserSelect;
