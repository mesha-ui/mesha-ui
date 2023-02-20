
import React, { useState } from 'react';
import styles from './filters.module.scss';
import colors from "../../styles/colors.module.scss";
import Typography, { TextType } from "../Typography/Typography";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

interface Props {
  options: { name: string, selected: boolean }[];
  buttonClassName?: string;
  portal?: boolean | {
    target?: Element;
    stablePosition?: boolean;
  }
}

const Filter = ({ options, buttonClassName, portal }: Props) => {

  const menuPortal = portal === undefined ? false : portal;

  const [filters, setFilters] = useState(options);

  const setFilter = (index: number) => {
    setFilters([
      ...filters.map((option, i) => i === index ? ({ ...option, selected: true }) : ({ ...option, selected: false })),
    ]);
  };

  const selectedOption = filters.find(({ selected }) => selected);

  return (
    <Menu
      align="end"
      offsetY={8}
      viewScroll="close"
      portal={menuPortal}
      menuClassName={styles.menu}
      transition
      menuButton={
        <MenuButton className={[styles.menuBtn, buttonClassName].join(" ")}>
          <Typography
            text={selectedOption?.name || "Filter"}
            textType={TextType.caption}
            element={"span"}
            color={colors?.textColorPrimary}
            className={styles.menuBtnText}
          />
        </MenuButton>
      }
    >
      {filters.map(({ name }, index) => (
        <MenuItem
          className={styles.menuItem}
          key={name}
          onClick={() => setFilter(index)}
        >
          <Typography
            text={name}
            textType={TextType.body}
            element="span"
            color={colors.textColorPrimary}
          />
        </MenuItem>
      ))}
    </Menu>
  )
}

export default Filter;