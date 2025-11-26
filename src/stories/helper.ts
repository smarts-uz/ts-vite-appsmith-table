import "../tailwind.css";
import type { Schema } from "../types";
import { ItemSize } from "../constants";
import { faker } from "@faker-js/faker";

export const mockSchema: Schema = {
  id: {
    title: "ID",
    sort: false,
  },
  name: {
    title: "Name",
    sort: true,
    size: ItemSize.md,
  },
  created_at: {
    title: "Date of Creation",
    sort: true,
    size: ItemSize.md,
  },
  phone: {
    title: "Phone",
    sort: true,
    size: ItemSize.lg,
  },
  orders: {
    title: "Orders",
    sort: true,
    size: ItemSize.lg,
  },
  description: {
    title: "Description",
  },
};

export const generateData = (count: number) =>
  Array.from({ length: count }).map(() => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    created_at: faker.date.past(),
    phone: faker.phone.number(),
    orders: faker.number.int(),
    description: faker.lorem.sentence(),
  }));
