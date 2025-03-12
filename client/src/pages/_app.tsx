import type { AppProps } from "next/app";
import { UserProvider } from "../context/userContext";  // Import User Context
import "../styles/globals.css";  // Import global styles if any

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
