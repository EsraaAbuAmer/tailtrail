import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';


const certDir = path.resolve(__dirname, 'cert');
const keyPath = path.join(certDir, 'localhost-key.pem');
const certPath = path.join(certDir, 'localhost.pem');

export default defineConfig({
  plugins: [react()],
  server: {
    https:
      fs.existsSync(keyPath) && fs.existsSync(certPath)
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
          }
        : false,
    port: 5173,
  },
});
