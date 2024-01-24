import * as path from 'path';
import * as fs from 'fs';

import { defineConfig, AliasOptions, Alias } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// ************* create vite path resolve alias *************
// * src의 하위 directory를 읽어 sub directory를 가져와 아래 객체로 변환
// * { find: '@libs', replacement: resolve(__dirname, 'src/libs') },
const childDirectoriesOfSrc = fs
  .readdirSync(path.resolve(__dirname, 'src'), {
    withFileTypes: true,
  })
  .filter(childDir => childDir.isDirectory())
  .map(
    onlyDir =>
      ({
        find: `@${onlyDir.name}`,
        replacement: path.resolve(__dirname, `src/${onlyDir.name}`),
      }) as Alias,
  );

const alias: AliasOptions = [
  { find: '@', replacement: path.resolve(__dirname, 'src') },
  ...childDirectoriesOfSrc,
];
// **********************************************************

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias,
  },
});
