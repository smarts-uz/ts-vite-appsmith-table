import { getNestedValue } from "./getNestedValue";
import type { Row } from "@tanstack/react-table";

export enum RowStyleOperator {
  GT = ">",
  LT = "<",
  GTE = ">=",
  LTE = "<=",
  EQ = "===",
  EQ_LOOSE = "==",
  NEQ = "!==",
  NEQ_LOOSE = "!=",
  CONTAINS = "contains",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  IS_EMPTY = "isEmpty",
  IS_NOT_EMPTY = "isNotEmpty",
}

export interface RowStyleRule {
  column: string; // path to the value or array of objects
  operator: RowStyleOperator | keyof typeof RowStyleOperator | string;
  value?: string | number; // optional for isEmpty / isNotEmpty
  color: string; // CSS color
}

// Type for single value or array of objects
type CellValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, any>[];

type PrimitiveCellValue = string | number | boolean | null | undefined;

const isPrimitiveCellValue = (input: unknown): input is PrimitiveCellValue => {
  if (input === null) return true;

  const inputType = typeof input;

  return (
    inputType === "string" ||
    inputType === "number" ||
    inputType === "boolean" ||
    inputType === "undefined"
  );
};

const normalizeToPrimitiveValue = (
  cellValue: CellValue
): PrimitiveCellValue => {
  if (!Array.isArray(cellValue) || cellValue.length === 0) {
    return isPrimitiveCellValue(cellValue) ? cellValue : undefined;
  }

  const firstItem = cellValue[0];

  if (
    firstItem !== null &&
    typeof firstItem === "object" &&
    !Array.isArray(firstItem)
  ) {
    const firstPrimitive = Object.values(
      firstItem as Record<string, unknown>
    ).find(isPrimitiveCellValue);
    return firstPrimitive ?? undefined;
  }

  return isPrimitiveCellValue(firstItem) ? firstItem : undefined;
};

export const getConditionalRowStyle = <T extends object>({
  row,
  rowStyleRules,
}: {
  row: Row<T>;
  rowStyleRules?: RowStyleRule[];
}): React.CSSProperties => {
  if (!rowStyleRules || rowStyleRules.length === 0) {
    return {};
  }

  const rowData = row.original;

  for (const rule of rowStyleRules) {
    const { column, operator, value, color } = rule;
    if (!column || !operator || !color) continue;

    const cellValue = getNestedValue(rowData, column, undefined) as CellValue;
    if (cellValue === undefined) continue;

    const valueToCompare = normalizeToPrimitiveValue(cellValue);

    let conditionMet = false;
    const numCellValue = parseFloat(valueToCompare as any);
    const numValue = parseFloat(value as any);

    switch (operator) {
      case RowStyleOperator.GT:
        conditionMet =
          !isNaN(numCellValue) && !isNaN(numValue) && numCellValue > numValue;
        break;
      case RowStyleOperator.LT:
        conditionMet =
          !isNaN(numCellValue) && !isNaN(numValue) && numCellValue < numValue;
        break;
      case RowStyleOperator.GTE:
        conditionMet =
          !isNaN(numCellValue) && !isNaN(numValue) && numCellValue >= numValue;
        break;
      case RowStyleOperator.LTE:
        conditionMet =
          !isNaN(numCellValue) && !isNaN(numValue) && numCellValue <= numValue;
        break;
      case RowStyleOperator.EQ:
        conditionMet = valueToCompare === value;
        break;
      case RowStyleOperator.EQ_LOOSE:
        conditionMet = valueToCompare == value;
        break;
      case RowStyleOperator.NEQ:
        conditionMet = valueToCompare !== value;
        break;
      case RowStyleOperator.NEQ_LOOSE:
        conditionMet = valueToCompare != value;
        break;
      case RowStyleOperator.CONTAINS:
        conditionMet = String(valueToCompare)
          .toLowerCase()
          .includes(String(value).toLowerCase());
        break;
      case RowStyleOperator.STARTS_WITH:
        conditionMet = String(valueToCompare)
          .toLowerCase()
          .startsWith(String(value).toLowerCase());
        break;
      case RowStyleOperator.ENDS_WITH:
        conditionMet = String(valueToCompare)
          .toLowerCase()
          .endsWith(String(value).toLowerCase());
        break;
      case RowStyleOperator.IS_EMPTY:
        conditionMet =
          valueToCompare === null ||
          valueToCompare === undefined ||
          valueToCompare === "";
        break;
      case RowStyleOperator.IS_NOT_EMPTY:
        conditionMet =
          valueToCompare !== null &&
          valueToCompare !== undefined &&
          valueToCompare !== "";
        break;
    }

    if (conditionMet) {
      return { backgroundColor: color };
    }
  }

  return {};
};
