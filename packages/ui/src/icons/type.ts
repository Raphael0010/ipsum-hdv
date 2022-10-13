import type { IconProps as IconPropsDefault } from '@pikas-ui/icons';
import type { GetInnerShadow } from './utils';

export type IconProps = IconPropsDefault & {
  innerShadow?: GetInnerShadow;
};
