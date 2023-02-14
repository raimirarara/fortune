import Head from "next/head";
import Image from "next/image";
import "dayjs/locale/ja";
import { css } from "@emotion/react";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import RelationSanku from "public/relation_sanku.png";
import RelationYado from "public/relation_yado.png";
import { CalendarInfo } from "@/entities/CalendarInfo";
import { Button, Container, Text, Title, createStyles } from "@mantine/core";
import BackgroundImage from "@/components/BackgroundImage";
import { ASTROLOGY27 } from "@/entities/CalendarInfo";
import HeaderMenu from "@/components/HeaderMenu";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 40,
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

  button: {
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },
}));

export default function Result() {
  const router = useRouter();
  const { classes } = useStyles();
  const [myShukuyou, setShukuyou] = useState(router.query.syukuyou as string);
  // 昴宿を先頭としたObject配列
  const rotateASTROLOGY27 = ASTROLOGY27.slice(16).concat(ASTROLOGY27.slice(0, 16));
  const myShukyouIndex = rotateASTROLOGY27.findIndex(({ value }) => value == myShukuyou);
  const rotateAngle = myShukyouIndex * 13.35;
  useEffect(() => {
    // reload時にもう一度setする
    if (router.query.syukuyou) {
      setShukuyou(router.query.syukuyou as string);
    }
  }, [router.query.syukuyou]);

  return (
    <>
      <Head>
        <title>{myShukuyou}</title>
        <meta name="description" content="宿曜占い 結果" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sakura_crown.ico" />
      </Head>
      <HeaderMenu />
      <BackgroundImage>
        <Container className={classes.wrapper} size={1400}>
          <Title className={classes.title}>
            <Text className={classes.subtitle}>{myShukuyou}</Text>
            <Text className={classes.subtitle2}>{rotateASTROLOGY27[myShukyouIndex]?.kana}</Text>
          </Title>

          <div className={classes.controls}>
            <Image
              css={css`
                position: absolute;
              `}
              width={350}
              src={RelationSanku}
              alt="relation_sanku"
            />
            <Image
              css={css`
                transform: rotate(${rotateAngle}deg);
              `}
              width={350}
              src={RelationYado}
              alt="relation_yado"
            />
          </div>
          <div className={classes.button}>
            <Button
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
              size="md"
              onClick={() => router.push("/")}
            >
              もどる
            </Button>
          </div>
        </Container>
      </BackgroundImage>
    </>
  );
}
