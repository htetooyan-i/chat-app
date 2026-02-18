import React from 'react';
import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import type { DropdownProps, MenuProps } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';

const useStyles = createStyles(({ token }) => ({
  root: {
    backgroundColor: "var(--chat-panel)",
    border: `1px solid var(--muted-border)`,
    borderRadius: token.borderRadius,
    '& .ant-dropdown-menu': {
      backgroundColor: 'var(--chat-panel)',
    },
    // '& .ant-dropdown-menu-item': {
    //   color: 'var(--foreground) !important',
    //   '&:hover': {
    //     backgroundColor: 'red',
    //   },
    // },
    '& .ant-dropdown-menu-item .ant-dropdown-menu-title-content': {
      color: 'var(--foreground) !important',
    },
  },
}));

const dropdownStyles: DropdownProps['styles'] = {
  item: {
    color: "red",
  },
  itemContent: {
    fontWeight: 'bold',
  },
};

type DropdownComponentProps = {
  items: MenuProps['items'] ;
  children: React.ReactNode;
}

function DropdownComponent({ items, children }: DropdownComponentProps) {

  const { styles } = useStyles();

  const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };
  
  return (
      <div>
          <Dropdown 
          {...sharedProps}
          menu={{ items }} 
          trigger={['contextMenu']}
          styles={dropdownStyles}
          > 
            {children}
          </Dropdown>
      </div>
  );
}

export default DropdownComponent;