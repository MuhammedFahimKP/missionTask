import React, { useEffect, useState } from "react";

import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { Post } from "@/types";
import apiClient from "@/services/api-client";
import Column from "../Column";

const CustomForm: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<Post[]>("posts/", { signal: controller.signal })
      .then((res) => {
        setData(res.data.slice(0, 6));
      });

    return () => controller.abort();
  }, []);

  const getParticularPost = (id: number | string) =>
    data.findIndex((post) => post.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    setData((prevData) => {
      const orginalPos = getParticularPost(active.id);
      const newPos = getParticularPost(over?.id || 0);

      return arrayMove(prevData, orginalPos, newPos);
    });
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column posts={data} />
      </DndContext>

      {/* <Column /> */}
    </div>
  );
};

export default CustomForm;
