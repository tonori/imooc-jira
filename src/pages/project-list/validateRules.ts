import { Rule } from "antd/es/form";

const validateRules: { [key: string]: Rule } = {
  name: {
    required: true,
    message: "必须填写项目名称",
  },
  organization: {
    required: true,
    message: "必须指定负责部门",
  },
  personId: {
    required: true,
    message: "必须指定负责人",
  },
};

export default validateRules;
