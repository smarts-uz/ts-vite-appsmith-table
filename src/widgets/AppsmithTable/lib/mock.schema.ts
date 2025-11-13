import { ColumnType, ItemSize } from "../constants";

export const postsTableSchema = {
  userId: {
    type: ColumnType.NUMBER,
    title: "User ID",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  id: {
    type: ColumnType.ID,
    title: "Post ID",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  title: {
    type: ColumnType.TEXT,
    title: "Title",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  body: {
    type: ColumnType.TEXT,
    title: "Body",
    sort: false,
    filter: true,
    size: ItemSize.sm,
  },
};
