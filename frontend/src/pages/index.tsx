import Head from "next/head";
import Image from "next/image";
import "dayjs/locale/ja";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import JapaneseLunisolarCalendar from "@/entities/JapaneseLunisolarCalendar";
import { createCalendarInfo } from "@/entities/CalendarInfo";
import { createStyles, Title, Text, Button, Container } from "@mantine/core";
import BackgroundImage from "@/components/BackgroundImage";
import HeaderMenu from "@/components/HeaderMenu";
import { AppFooter } from "@/components/AppFooter";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 120,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 36,
    letterSpacing: -1,
    marginBottom: theme.spacing.sm,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 24,
      textAlign: "center",
      marginBottom: theme.spacing.xs,
    },
  },

  subtitle: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    "@media (max-width: 520px)": {
      textAlign: "center",
      fontSize: 28,
    },
  },

  subtitle2: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 28,
    "@media (max-width: 520px)": {
      textAlign: "center",
      fontSize: 20,
    },
  },

  controls: {
    width: "100%",
    minWidth: 195,
    paddingInline: 120,
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "@media (min-width: 1125px)": {
      paddingInline: 420,
    },
    "@media (max-width: 755px)": {
      paddingInline: 60,
    },
  },

  spacer: {
    height: theme.spacing.lg,
  },
}));

export default function Home() {
  const router = useRouter();
  const { classes } = useStyles();
  const [value, onChange] = useState<Date | null>(new Date("1980-01-01"));

  useEffect(() => {
    // sessionStorage に保存したデータを取得する
    let data = sessionStorage.getItem("prevDate");
    if (data) {
      onChange(new Date(data));
    }
  }, []);

  const onClick = () => {
    if (!value) {
      return;
    }
    // sessionStorage にデータを保存する
    sessionStorage.setItem("prevDate", value.toDateString());

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
        <title>咲麗流 宿曜占星術</title>
        <meta name="description" content="咲麗流 宿曜占星術 自身の宿曜を知ろう!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sakura_crown.ico" />
      </Head>
      <BackgroundImage>
        <HeaderMenu />
        <Container className={classes.wrapper} size={1400}>
          <div className={classes.inner}>
            <Title className={classes.title}>
              <Text>咲麗流</Text>
              <Text className={classes.subtitle}>宿曜占星術</Text>
            </Title>
            <div className={classes.spacer} />
            <div className={classes.controls}>
              <Text className={classes.subtitle2}>生年月日</Text>
              <DatePicker
                dropdownType="modal"
                size="lg"
                locale="ja"
                placeholder="生年月日を入力"
                inputFormat="YYYY年MM月DD日"
                labelFormat="YYYY年MM月"
                value={value}
                onChange={onChange}
                minDate={new Date("1868/01/01 00:00:00")}
                maxDate={new Date("2099/12/31 23:59:59")}
              />
            </div>
            <div className={classes.controls}>
              <Button
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                size="lg"
                onClick={onClick}
              >
                占う
              </Button>
            </div>
          </div>
        </Container>
        <AppFooter />
      </BackgroundImage>
    </>
  );
}
