export interface DropSortProps {
  // 拖动的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 在目标 item 的前还是后放下
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}
