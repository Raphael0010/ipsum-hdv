import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import Link from 'next/link';
import { FC } from 'react';
import { Label } from '@ipsum-hdv/ui/dist/core/pikas-ui/Text';
type SidebarNavigationProps = {
  selected: boolean;
  label: string;
  svg?: JSX.Element;
  href?: string;
  onClick?: () => void;
};

const NavLink = styled('a', {
  '&:hover': {
    linearGradient: 'to right, $BACKGROUND_LIGHTER 0%, $PRIMARY_DARKER 100%',
  },
  width: '100%',
  textTransform: 'uppercase',
  fontWeight: '400',
  fontSize: '$3',
  color: '$gray900',
  p: '$3',
  display: 'flex',
  my: '$2',
  cursor: 'pointer',
  paddingLeft: '20px',
  paddingBottom: '5px',
  paddingTop: '5px',
  textDecoration: 'none',
  variants: {
    active: {
      selected: {
        linearGradient:
          'to right, $BACKGROUND_LIGHTER 0%, $PRIMARY_DARKER 100%',
        border: '0px $PRIMARY_DARK',
        borderRightWidth: '5px',
        borderStyle: 'solid',
        color: '$PRIMARY_DARKER',
      },
    },
  },
});

export const SidebarNavigation: FC<SidebarNavigationProps> = (props) => (
  <Link href={props.href ?? '#'}>
    <NavLink
      active={props.selected ? 'selected' : undefined}
      onClick={props.onClick}
    >
      {props.svg && <span>{props.svg}</span>}
      <Label css={{ color: '$WHITE' }}>{props.label}</Label>
    </NavLink>
  </Link>
);
