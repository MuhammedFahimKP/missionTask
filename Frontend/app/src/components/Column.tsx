import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { Post as PostType } from "@/types";

import Post from "./Post";

interface Props {
  posts: PostType[];
}

const Column: React.FC<Props> = ({ posts }) => {
  return (
    <div className="bg-gray-200 p-5  rounded-xl mx-auto ">
      <SortableContext items={posts} strategy={verticalListSortingStrategy}>
        {posts.map((post: PostType) => (
          <Post id={post.id} key={post.id.toString()} title={post.title} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
