import React from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

export default function KanbanBoard() {
  const board = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "E-mail after registration so that I can confirm my",
            description:
              "Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.",
            type: "Development",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content",
          },
        ],
      },
      {
        id: 3,
        title: "Q&A",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content",
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content",
          },
        ],
      },
      {
        id: 4,
        title: "Production",
        cards: [
          {
            id: 12,
            title: "Card title 12",
            description: "Card content",
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content",
          },
        ],
      }
    ],
  };

  return (
    <div>
      <Board
        allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={console.log}
        onLaneRename={console.log}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={(draftCard) => ({
          id: new Date().getTime(),
          ...draftCard,
        })}
        onCardNew={console.log}
      />
    </div>
  );
}
