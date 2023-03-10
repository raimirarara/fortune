import { ASTROLOGY27 } from "@/entities/CalendarInfo";
import { Menu, ActionIcon, createStyles, ScrollArea } from "@mantine/core";

import { IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  menu: {
    position: "fixed",
    top: 10,
    left: 10,
    zIndex: 2,
  },
  dropdown: {
    maxHeight: 300,
    maxWidth: 70,
    display: "flex",
    justifyContent: "center",
    zIndex: 2,
  },
  area: {
    maxWidth: 70,
    textAlign: "center",
  },
  item: {
    maxHeight: 30,
    textAlign: "center",
  },
}));

export default function HeaderMenu() {
  const { classes } = useStyles();
  const router = useRouter();
  const rotateASTROLOGY27 = ASTROLOGY27.slice(16).concat(ASTROLOGY27.slice(0, 16));
  return (
    <div className={classes.menu}>
      <Menu shadow="md" width={100}>
        <Menu.Target>
          <ActionIcon color="dark">
            <IconMenu2 size={36} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className={classes.dropdown}>
          <ScrollArea style={{ height: 250, width: 80 }}>
            <div className={classes.area}>
              <Menu.Label>27宿</Menu.Label>
              <Menu.Divider />
              {rotateASTROLOGY27.map((yado) => (
                <Menu.Item className={classes.item} key={yado.value} onClick={() => router.push("/" + yado.value)}>
                  {yado.value}
                </Menu.Item>
              ))}
            </div>
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
