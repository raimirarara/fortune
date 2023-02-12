import Head from "next/head";
import Image from "next/image";
import "dayjs/locale/ja";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { DatePicker } from "@mantine/dates";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const [myShukuyou, setShukuyou] = useState(router.query.syukuyou);

  return (
    <>
      <Head>
        <title>result</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>{myShukuyou}</div>
      </main>
    </>
  );
}