import fs from 'fs';

export const getFileContent = (path) => (
    fs.readFileSync(path, { encoding: 'utf-8' }).trim()
);