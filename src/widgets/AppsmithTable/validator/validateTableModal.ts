import { toast } from "sonner";
import { TableModelSchema, type TableModel } from "../types";
import z from "zod";

export function validateTableModel(model: TableModel) {
  try {
    return TableModelSchema.parse(model);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Combine all messages
      const message = err.issues.map((e) => e.message).join("\n");

      toast.error(message, {
        duration: 10000, // optional: keep it visible for 10s
        richColors: true,
      });
    } else {
      toast.error("Unknown table validation error", {
        duration: 10000,
        richColors: true,
      });
    }
    return false;
  }
}
