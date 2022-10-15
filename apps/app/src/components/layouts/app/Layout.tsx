import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { FC, useState, ReactNode } from 'react';
import { MenuIcon } from '@ipsum-hdv/ui/dist/icons/Menu';
import { Menu } from './menu/Menu';

const Container = styled('div', {
  backgroundColor: '$BACKGROUND',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'row',
});

const Content = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  flexDirection: 'column',
  alignItems: 'start',
});

const Child = styled('div', {
  padding: 30,
  flex: 1,
  width: '100%',
  alignItems: 'start',
  overflow: 'auto',
});

type CustomProps = {
  children?: ReactNode;
};

export const AppLayout: FC<CustomProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <Content>
        <MenuIcon
          size={32}
          color="WHITE"
          onClick={(): void => setIsOpen(!isOpen)}
          css={{
            container: {
              padding: '$5',
              zIndex: '$XXX-HIGH',
              cursor: 'pointer',
              '@lg': {
                display: 'none',
              },
            },
          }}
        />

        <Child>{children}</Child>
      </Content>
    </Container>
  );
};
