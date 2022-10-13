import { ReactNode } from 'react';

export type GetInnerShadow = {
  dx: number;
  dy: number;
  opacity: number;
  deviation: number;
};

export const getInnerShadowId = ({
  dx,
  dy,
  opacity,
  deviation,
}: GetInnerShadow): string => `innerShadow-${dx}-${dy}-${opacity}-${deviation}`;

export const getInnerShadow = ({
  dx,
  dy,
  opacity,
  deviation,
}: GetInnerShadow): ReactNode => (
  <defs>
    <filter id={getInnerShadowId({ dx, dy, opacity, deviation })}>
      <feOffset dx={dx} dy={dy} />

      <feGaussianBlur stdDeviation={deviation} result="offset-blur" />

      <feComposite
        operator="out"
        in="SourceGraphic"
        in2="offset-blur"
        result="inverse"
      />

      <feFlood floodColor="black" floodOpacity={opacity} result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />

      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
    </filter>
  </defs>
);
