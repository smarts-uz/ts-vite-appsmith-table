import "../tailwind.css";
import type { Schema } from "../types";
import { ItemSize } from "../constants";
import { faker } from "@faker-js/faker";

export const mockSchema: Schema = {
  customer_name: {
    title: "Mijoz Ismi",
  },
  delivery_location: {
    title: "Mijoz Ismi",
    type: "url",
  },
  start_date: {
    title: "Sanasi",
    type: "date",
  },
  total_lost_qty: {
    title: "Qolgan maxsulot soni",
    size: ItemSize.sm,
  },
  used_days: {
    title: "Foydalanilgan kun",
    size: ItemSize.sm,
  },
  debt_amount: {
    title: "Qarz",
    type: "currency",
  },
  customer_phone: {
    title: "Telefon Raqam",
    type: "phone",
  },
  total_payment_amount: {
    title: "Ummiy tolangan",
    type: "currency",
  },
};

export const generateData = (count: number) =>
  Array.from({ length: count }).map(() => ({
    customer_name: faker.person.fullName(),
    delivery_location: `${faker.location.streetAddress()}|||${faker.internet.url()}`,
    start_date: faker.date.past({ years: 1 }).toISOString().slice(0, 10),
    total_lost_qty: faker.number.int({ max: 999 }),
    used_days: faker.number.int({ max: 365 }),
    debt_amount: faker.number.int({ max: 999999999 }),
    customer_phone: faker.phone.number({ style: "international" }),
    total_payment_amount: faker.number.int({ max: 999999999 }),
  }));
