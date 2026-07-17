import * as XLSX from "xlsx";
import type { User } from "../src/types/user";

export function exportUsersToExcel(users: User[]) {
  const rows = users.map((user) => ({
    ID: user.id,
    Name: user.name,
    Username: user.username,
    Email: user.email,
    City: user.address?.city ?? "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, "users.xlsx");
}
