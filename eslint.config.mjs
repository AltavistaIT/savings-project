import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Bloque para ignorar archivos
  {
    ignores: ["src/types/internal-api/**"],
  },

  // Configuración principal heredada
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
