/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    // Declara tus variables aquí, ¡recuerda el prefijo REACT_APP_!
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_API_KEY: string;
  }
}
