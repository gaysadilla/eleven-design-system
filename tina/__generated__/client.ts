import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

// Use TinaCloud in production, localhost in development
const isProduction = process.env.NODE_ENV === 'production';
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "";
const token = process.env.TINA_TOKEN || "";
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main";

// Always use TinaCloud if we have clientId, regardless of NODE_ENV
const apiUrl = clientId 
  ? `https://content.tinajs.io/content/${clientId}/github/${branch}`
  : 'http://localhost:4001/graphql';



export const client = createClient({ 
  url: apiUrl,
  token,
  queries,
});
export default client;
  