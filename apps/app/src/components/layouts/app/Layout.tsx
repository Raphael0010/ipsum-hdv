import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { FC, useState, ReactNode } from 'react';
import { getLink } from '@ipsum-hdv/router/dist/app';
import { trpc } from '../../../utils/trpc';
import { Logo } from '../../global/Logo';
import { SidebarGroup } from '../../global/SidebarGroup';
import { SidebarNavigation } from '../../global/SidebarNavigation';
import { useRouter } from 'next/router';
import { MenuIcon } from '@ipsum-hdv/ui/dist/icons/Menu';
import { Textfield } from '@ipsum-hdv/ui/dist/components/inputs/textfield/Textfield';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import { PacmanLoader } from '@ipsum-hdv/ui/dist/core/pikas-ui/Loader';
import { Select } from '@ipsum-hdv/ui/dist/core/pikas-ui/Select';
import { timeAgo } from '../../../utils/date';
import { CustomDialog } from '@ipsum-hdv/ui/dist/core/pikas-ui/Dialog';

const LayoutSidebar = styled('div', {
  variants: {
    isOpen: {
      true: {
        display: 'flex',
      },
      false: {
        display: 'none',
        '@lg': {
          display: 'flex',
        },
      },
    },
  },
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: '$XX-HIGH',
  maxHeight: '100vh',
  my: '$4',
  mx: '$2',
  backgroundColor: '$BACKGROUND_LIGHTER',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '@lg': {
    width: '20rem',
    margin: '30px',
    position: 'relative',
    borderRadius: '20px',
  },
});

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
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [serverId, setServerId] = useLocalStorage('serverId', 401);
  const debouncedValue = useDebounce<string>(search, 200);
  const { data: typeName } = trpc.item.typeNameSearch.useQuery({
    search: debouncedValue,
  });

  const { locale } = useRouter();

  const { data: serverAndLastUpdate, isLoading: loadingServer } =
    trpc.item.getServerAndUpdate.useQuery({});

  if (loadingServer) {
    return (
      <Container>
        <CustomDialog
          visible={true}
          header={<h2>Nous chargeons les données !</h2>}
          padding={{
            container: 'md',
            footer: 'md',
          }}
          hasCloseIcon={false}
          closeIfClickOutside={false}
          footer={<PacmanLoader colorHex="#292929" />}
          gap={{
            container: 'md',
          }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <LayoutSidebar isOpen={isOpen}>
        <Logo onClick={() => setIsOpen(false)} />
        {serverAndLastUpdate ? (
          <Select
            onChange={(e) => setServerId(Number(e))}
            defaultValue={serverId.toString()}
            css={{
              container: {
                padding: '10px',
              },
            }}
            data={[
              {
                name: 'Serveur',
                items: serverAndLastUpdate.map((e) => ({
                  label: `${e.name} ${
                    e.prices[0]
                      ? timeAgo(e.prices[0].createdAt, locale ?? 'fr')
                      : ''
                  }`,
                  value: e.id.toString(),
                  disabled: !e.prices.length,
                })),
              },
            ]}
          />
        ) : (
          <Select
            onChange={(e) => setServerId(Number(e))}
            defaultValue={serverId.toString()}
            css={{
              container: {
                padding: '10px',
              },
            }}
            data={[
              {
                name: 'Serveur',
                items: [],
              },
            ]}
          />
        )}
        <Textfield
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Catégorie"
          css={{
            container: {
              padding: '10px',
            },
          }}
        ></Textfield>
        <SidebarGroup label="">
          {typeName?.map((e) => (
            <SidebarNavigation
              key={e.id}
              label={e.name}
              onClick={() => setIsOpen(false)}
              selected={router.query.itemTypeId === e.id.toString()}
              href={getLink('itemType', { queries: { itemTypeId: e.id } })}
            />
          ))}
        </SidebarGroup>
      </LayoutSidebar>
      <Content>
        <MenuIcon
          size={32}
          color="WHITE"
          onClick={(): void => setIsOpen((value) => !value)}
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
