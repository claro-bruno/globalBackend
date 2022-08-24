import fs from 'fs';

export const getFileContent = (path: any) => (
    fs.readFileSync(path, { encoding: 'utf-8' }).trim()
);