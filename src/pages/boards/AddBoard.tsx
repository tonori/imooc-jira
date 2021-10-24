// Components
import SubmitInput from "./SubmitInput";
import { Container as BoardContainer } from "./BoardItem";
// Hooks
import { useAddBoard } from "page-hooks/boards";

const AddBoard = () => {
  const { mutate, isLoading } = useAddBoard();
  return (
    <BoardContainer>
      <SubmitInput
        placeholder="新建任务看板"
        loading={isLoading}
        onSearch={(value) => mutate(value)}
      />
    </BoardContainer>
  );
};

export default AddBoard;
