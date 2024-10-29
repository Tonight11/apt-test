import { readFile } from "fs/promises";
import { join } from "path";
import { Category } from "~/types";

export default defineEventHandler(async (event): Promise<Category[] | null> => {
  try {
    const filePath = join(process.cwd(), "data", "task_json.txt");
    console.log(filePath)
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading task_json.txt:", error);
    return null;
  }
})
