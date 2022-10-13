import { FC, ReactNode } from 'react';

type SidebarGroupProps = {
  label: string;
  children?: ReactNode;
};

export const SidebarGroup: FC<SidebarGroupProps> = (props) => (
  <nav style={{ overflowY: 'scroll' }}>
    {props.label}
    {props.children}
  </nav>
);
