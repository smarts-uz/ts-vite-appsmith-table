import { type TableSchema, ColumnType } from "./schema";

export const postsTableSchema: TableSchema = {
  userId: {
    type: ColumnType.NUMBER,
    title: "User ID",
    sort: true,
    filter: true,
    size: "sm",
  },
  id: {
    type: ColumnType.ID,
    title: "Post ID",
    sort: true,
    filter: true,
    size: "sm",
  },
  title: {
    type: ColumnType.TEXT,
    title: "Title",
    sort: true,
    filter: true,
    size: "md",
  },
  body: {
    type: ColumnType.TEXT,
    title: "Body",
    sort: false,
    filter: true,
    size: "lg",
  },
};
