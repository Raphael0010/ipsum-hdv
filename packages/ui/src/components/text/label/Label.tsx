import { Label as LabelPikasUI, LabelProps } from '@pikas-ui/text';
import { FC } from 'react';

export type { LabelProps } from '@pikas-ui/text';

export const Label: FC<LabelProps> = (props) => (
  <LabelPikasUI
    {...props}
    css={{
      color: '$WHITE',
      ...props.css,
    }}
  />
);

Label.displayName = 'Label';
