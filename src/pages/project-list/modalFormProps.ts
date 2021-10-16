import { FormInstance, FormProps } from "antd";

import { Dispatch, SetStateAction } from "react";

export interface ModalFormProps extends Exclude<FormProps, "form"> {
  form: FormInstance;
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
}
