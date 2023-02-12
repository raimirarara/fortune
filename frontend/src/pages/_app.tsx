import { AppFooter } from "@/components/AppFooter";
import "@/styles/globals.css";
import { AppShell } from "@mantine/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell
      footer={<AppFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.pink[0],
        },
      })}
    >
      <Component {...pageProps} />
    </AppShell>
  );
}
