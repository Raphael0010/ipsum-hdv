import type { TitleProps } from '@pikas-ui/title';
import { Title as TitlePikasUI } from '@pikas-ui/title';
import { FC } from 'react';

export type {
  TitleAs,
  TitleProps,
  TitleCSS,
  TitleComponent,
  TitleTextTransform,
  TitleVariant,
  TextTransformComponent,
} from '@pikas-ui/title';

export const Title: FC<TitleProps> = (props) => (
  <TitlePikasUI
    {...props}
    css={{
      ...props.css,
      global: {
        color: '$WHITE',
        ...props.css?.global,
      },
    }}
  />
);

Title.displayName = 'Title';
