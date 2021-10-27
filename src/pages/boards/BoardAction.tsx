import { Button, Dropdown, List } from "antd";
import { Link } from "react-router-dom";

import { Board } from "types/boards";
import { useHistory, useRouteMatch } from "react-router";
import { useBoardsCURD } from "../../page-hooks/boards";
import { deleteBoardConfirm } from "utils/createDeleteConfirm";
import { useProjectIdInParam } from "../../page-hooks/useProjectIdInParam";

const BoardAction = ({ board }: { board: Board }) => {
  const history = useHistory();
  const projectId = useProjectIdInParam();
  const { url } = useRouteMatch();
  const { useDeleteItem } = useBoardsCURD();
  const { mutate, isLoading } = useDeleteItem();

  const deleteButtonOnClick = () => {
    history.push(`${url}/${board.id}/delete`);
    const onOk = () => {
      mutate(board.id);
      onCancel();
    };
    const onCancel = () => history.replace(`${url}`);
    deleteBoardConfirm(board.name, isLoading, onOk, onCancel);
  };

  const actions = (
    <List>
      <List.Item>
        <Link to={`/projects/${projectId}/board/${board.id}/edit`}>
          <Button type="link">编辑</Button>
        </Link>
      </List.Item>
      <List.Item>
        <Button type="link" danger onClick={deleteButtonOnClick}>
          删除
        </Button>
      </List.Item>
    </List>
  );

  return (
    <Dropdown overlay={actions}>
      <span style={{ color: "#1890ff" }}>...</span>
    </Dropdown>
  );
};
export default BoardAction;
