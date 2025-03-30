export const env: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};

type Env = {
  VITE_API_URL: string;
};

// if (!env.VITE_API_URL) {
//   throw new Error("VITE_API_URL is not set");
// }
