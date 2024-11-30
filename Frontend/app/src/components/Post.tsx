import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  title: string;
  id: number;
}

const Post: React.FC<Props> = ({ id, title }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className="my-2  bg-white rounded-lg p-5 "
    >
      {title}
    </div>
  );
};

export default Post;
