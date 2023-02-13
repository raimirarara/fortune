import Head from "next/head";
import Image from "next/image";
import "dayjs/locale/ja";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import JapaneseLunisolarCalendar from "@/entities/JapaneseLunisolarCalendar";
import { createCalendarInfo } from "@/entities/CalendarInfo";
import { createStyles, Title, Text, Button, Container } from "@mantine/core";
import BackgroundImage from "@/components/BackgroundImage";

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
    minWidth: 190,
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default function Home() {
  const router = useRouter();
  const { classes } = useStyles();
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
        <title>咲麗流 宿曜占星術</title>
        <meta name="description" content="宿曜占い" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sakura_crown.ico" />
      </Head>
      <BackgroundImage>
        <Container className={classes.wrapper} size={1400}>
          <div className={classes.inner}>
            <Title className={classes.title}>
              <Text>咲麗流</Text>
              <Text className={classes.subtitle}>宿曜占星術</Text>
            </Title>

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
      </BackgroundImage>
    </>
  );
}
