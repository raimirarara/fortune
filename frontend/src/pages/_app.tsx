import { AppFooter } from "@/components/AppFooter";
import "@/styles/globals.css";
import { AppShell } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell
      styles={{
        main: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          padding: "6rem",
        },
      }}
      footer={<AppFooter />}
    >
      <Component {...pageProps} />
    </AppShell>
  );
}
