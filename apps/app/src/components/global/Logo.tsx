import { getLink } from '@ipsum-hdv/router/dist/app';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import Link from 'next/link';
import { FC } from 'react';

const LogoContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Image = styled('img', {
  width: '200px',
  margin: '5px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    '-webkit-transform': 'scale(1.1)',
    '-moz-transform': 'scale(1.1)',
    '-ms-transform': 'scale(1.1)',
    '-o-transform': 'scale(1.1)',
    transform: 'scale(1.1)',
  },
  cursor: 'pointer',
  currentColor: 'red',
});

type Props = {
  onClick?: () => void;
};

export const Logo: FC<Props> = ({ onClick }) => (
  <LogoContainer
    onClick={onClick}
    className="flex items-center justify-center pt-6"
  >
    <Link href={getLink('home')} legacyBehavior>
      <Image alt="IpsumHdv" src={'/images/logo.svg'} />
    </Link>
  </LogoContainer>
);
