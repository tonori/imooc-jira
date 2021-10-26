import { FormInstance, FormProps } from "antd";

import { Dispatch, SetStateAction } from "react";

interface ModalFormProps extends Exclude<FormProps, "form"> {
  form: FormInstance;
  setConfirmLoading: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

export default ModalFormProps;
