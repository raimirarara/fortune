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

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
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
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "center",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "center",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
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
        <title>宿曜占い</title>
        <meta name="description" content="宿曜占い" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container className={classes.wrapper} size={1400}>
          <div className={classes.inner}>
            <Title className={classes.title}>
              <Text component="span" className={classes.highlight} inherit>
                宿曜占い
              </Text>
            </Title>

            <Container p={0} size={600}>
              <Text size="lg" color="dimmed" className={classes.description}>
                宿曜占星術
              </Text>
            </Container>

            <div className={classes.controls}>
              <DatePicker
                dropdownType="modal"
                size="lg"
                locale="ja"
                placeholder="誕生日を入力"
                label="生年月日"
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
      </main>
    </>
  );
}
