'use server';

import fs from 'fs/promises';
import path from 'path';

export const getDirectories = async (source: string): Promise<string[]> => {
  try {
    const sourcePath = path.join(process.cwd(), 'src/app', source);
    const items = await fs.readdir(sourcePath, { withFileTypes: true });
    
    return items
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error('Error reading directories:', error);
    return [];
  }
};