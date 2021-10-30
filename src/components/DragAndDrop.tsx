import {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };
export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (!isValidElement(children))
          throw Error("Droppable 的 children 必须是一个 ReactNode");
        // 克隆 children 以附加上 Droppable 所需要的 props
        return cloneElement(children, {
          ...provided.droppableProps,
          ref: provided.innerRef,
          provided,
        });
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  HTMLAttributes<HTMLDivElement>;
export const DropChild = forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
        {props.provided?.placeholder}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (!isValidElement(children))
          throw Error("Droppable 的 children 必须是一个 ReactNode");
        return cloneElement(children, {
          ...provided.draggableProps,
          ...provided.dragHandleProps,
          ref: provided.innerRef,
        });
      }}
    </Draggable>
  );
};
