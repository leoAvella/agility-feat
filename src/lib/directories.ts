'use server';

import { getDirectories } from "./utils-directory";


export async function fetchDirectories(source: string) {
  try {
    const directories = getDirectories(source);
    return directories;
  } catch (err) {
    console.error("Error fetching directories:", err);
    throw new Error("Failed to fetch directories");
  }
}