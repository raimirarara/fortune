import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import SakuraLogo from "public/sakura_crown.png";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  logo: {
    marginTop: 12,
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function AppFooter() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image className={classes.logo} src={SakuraLogo} width={36} alt="logo" />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" onClick={() => router.push("https://m.facebook.com/100008427901351/")}>
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => router.push("https://youtube.com/playlist?list=PLPuCP1O7TgHvtFTZaJg-thBISe3CYgyBR")}
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => router.push("https://instagram.com/sakurasakusaku0604?igshid=YmMyMTA2M2Y=")}
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
