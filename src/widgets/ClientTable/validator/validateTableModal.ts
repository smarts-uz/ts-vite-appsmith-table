import { TableModelSchema, type TableModel } from "../types";
import z from "zod";

// Define a discriminated union for the return type
type ValidationResult =
  | { success: true }
  | { success: false; error: string | unknown };

export function validateTableModel(props: TableModel): ValidationResult {
  try {
    TableModelSchema.parse(props);
    return { success: true };
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      const message = err.issues.map((e) => e.message).join("\n");
      return { success: false, error: message };
    } else {
      return { success: false, error: err };
    }
  }
}
