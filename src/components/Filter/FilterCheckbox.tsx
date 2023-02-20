import React, { useState } from 'react';
import styles from './filters.module.scss';
import colors from "../../styles/colors.module.scss";
import Typography, { TextType } from "../Typography/Typography";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";


interface Props {
  options: { name: string, selected: boolean }[];
  buttonClassName?: string;
  showSelected?: boolean;
};

const FilterCheckbox = ({ options, buttonClassName, showSelected }: Props) => {

  const [filters, setFilters] = useState(options);

  const setAccountsFilter = (index: number, selected: boolean) => {
    setFilters([
      ...filters.map((option, i) => i === index ? ({ ...option, selected }) : option),
    ]);
  };
  const setAllAccountsFilter = (selected: boolean) => {
    setFilters([
      ...filters.map((option) => ({ ...option, selected })),
    ]);
  };

  const selectedAccounts = filters.filter(({ selected }) => selected);
  const isAllAccountsSelected = selectedAccounts.length === filters.length;
  const isSomeAccountsSelected = selectedAccounts.length && selectedAccounts.length < filters.length;

  return (
    <Menu
      align="end"
      offsetY={8}
      viewScroll="close"
      portal={true}
      menuClassName={styles.menu}
      transition
      menuButton={
        <MenuButton className={[styles.menuBtn, buttonClassName].join(" ")}>
          <Typography
            text={
              isAllAccountsSelected 
                ? `All accounts${showSelected ? "(" + filters.length + ")" : ""}`
                : selectedAccounts.length === 1
                  ? selectedAccounts[0].name
                  : `Accounts${showSelected ? "(" + selectedAccounts.length + ")" : ""}`
            }
            textType={TextType.caption}
            element={"span"}
            color={colors?.textColorPrimary}
            className={styles.menuBtnText}
          />
        </MenuButton>
      }
    >
      <MenuItem
        className={[
          styles.menuItem, 
          styles.menuItemCheckebox,
          styles.menuItemAll,
          isSomeAccountsSelected ? styles.menuItemCancel : "",
          isAllAccountsSelected ? styles.menuItemChecked : "",
        ].join(" ")}
        key={"allAccounts"}
        type="checkbox"
        checked={isAllAccountsSelected}
        onClick={(e) => {
          e.stopPropagation = true;
          e.keepOpen = true;
          setAllAccountsFilter(isSomeAccountsSelected ? false : !!e.checked);
        }}
      >
        <span className={styles.menuItemStatus}></span>
        <Typography
          text={"All accounts"}
          textType={TextType.body}
          element="span"
          color={colors.textColorPrimary}
        />
      </MenuItem>
        {filters.map(({ name, selected }, index) => (
          <MenuItem
            className={[
              styles.menuItem, 
              styles.menuItemCheckebox,
              selected ? styles.menuItemChecked : ""
            ].join(" ")}
            key={name}
            type="checkbox"
            checked={selected}
            onClick={(e) => {
              e.stopPropagation = true;
              e.keepOpen = true;
              setAccountsFilter(index, !!e.checked);
            }}
          >
            <span className={styles.menuItemStatus}></span>
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

export default FilterCheckbox;