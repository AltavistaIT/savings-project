// env.ts
function getEnvVar(name: string, isPublic = false): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  if (!isPublic && name.startsWith("NEXT_PUBLIC_")) {
    throw new Error(
      `Environment variable ${name} is public but used as private.`
    );
  }

  if (isPublic && !name.startsWith("NEXT_PUBLIC_")) {
    throw new Error(
      `Environment variable ${name} is private but used as public.`
    );
  }

  return value;
}

export const env = {
  INTERNAL_API_URL: getEnvVar("INTERNAL_API_URL"),
};
