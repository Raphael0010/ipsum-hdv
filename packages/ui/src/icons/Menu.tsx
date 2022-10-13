import type { IconProps } from './type';
import { getInnerShadow, getInnerShadowId } from './utils';
import { CustomIcon } from '@pikas-ui/icons';
import { FC } from 'react';

export const MenuIcon: FC<IconProps> = (props) => (
  <CustomIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      {props.innerShadow && getInnerShadow(props.innerShadow)}
      <path
        fill="currentColor"
        filter={
          props.innerShadow
            ? `url(#${getInnerShadowId(props.innerShadow)})`
            : undefined
        }
        d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
      ></path>
    </svg>
  </CustomIcon>
);
