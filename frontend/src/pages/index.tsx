import Head from "next/head";
import Image from "next/image";
import "dayjs/locale/ja";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { DatePicker } from "@mantine/dates";
import { Button } from "@mantine/core";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import JapaneseLunisolarCalendar from "@/entities/JapaneseLunisolarCalendar";
import { createCalendarInfo } from "@/entities/CalendarInfo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [value, onChange] = useState<Date | null>(new Date("1980-01-01"));

  const onClick = () => {
    if (!value) {
      return;
    }
    const calendar = new JapaneseLunisolarCalendar(value);
    const mySyukuyou = createCalendarInfo(calendar);
    router.push({
      pathname: "/[syukuyou]",
      query: { syukuyou: mySyukuyou?.value },
    });
  };

  return (
    <>
      <Head>
        <title>宿曜占い</title>
        <meta name="description" content="宿曜占い" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DatePicker locale="ja" placeholder="誕生日を入力" label="birthday" value={value} onChange={onChange} />
        <Button variant="gradient" gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }} onClick={onClick}>
          占う
        </Button>
      </main>
    </>
  );
}
