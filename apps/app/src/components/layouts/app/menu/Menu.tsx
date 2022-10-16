import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { FC, useState } from 'react';
import { getLink } from '@ipsum-hdv/router/dist/app';
import { trpc } from '../../../../utils/trpc';
import { Logo } from '../../../global/Logo';
import { SidebarGroup } from '../../../global/SidebarGroup';
import { SidebarNavigation } from '../../../global/SidebarNavigation';
import { useRouter } from 'next/router';
import { Textfield } from '@ipsum-hdv/ui/dist/components/inputs/textfield/Textfield';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import { PacmanLoader } from '@ipsum-hdv/ui/dist/core/pikas-ui/Loader';
import { Select } from '@ipsum-hdv/ui/dist/core/pikas-ui/Select';
import { timeAgo } from '../../../../utils/date';
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

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};
export const Menu: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const { locale } = useRouter();
  const [serverId, setServerId] = useLocalStorage('serverId', 401);
  const debouncedValue = useDebounce<string>(search, 200);
  const [startUpdate, setStartUpdate] = useState(false);

  const { data: superTypes, isLoading: loadingCategorie } =
    trpc.item.superTypeSearch.useQuery(
      {
        search: debouncedValue,
      },
      { refetchOnWindowFocus: false, onSuccess: () => setStartUpdate(true) }
    );

  const { data: serverAndLastUpdate } = trpc.item.getServerAndUpdate.useQuery(
    {},
    { refetchOnWindowFocus: false, enabled: startUpdate }
  );

  if (loadingCategorie) {
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
    <LayoutSidebar isOpen={isOpen}>
      <Logo onClick={() => setIsOpen(false)} />
      {serverAndLastUpdate ? (
        <Select
          onChange={(e) => setServerId(Number(e))}
          defaultValue={serverId.toString()}
          css={{
            container: {
              paddingLeft: '10px',
              paddingRight: '10px',
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
              paddingLeft: '10px',
              paddingRight: '10px',
            },
          }}
          data={[
            {
              name: 'Serveur',
              items: [
                {
                  label: 'Grandapan',
                  value: '401',
                },
                {
                  label: 'Oshimo',
                  value: '403',
                },
                {
                  label: 'Terra Cogita',
                  value: '404',
                },
                {
                  label: 'Herdegrize',
                  value: '405',
                },
                {
                  label: 'Dodge',
                  value: '406',
                },
                {
                  label: 'Brutas',
                  value: '407',
                  disabled: true,
                },
              ],
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
        {superTypes?.map((e) => (
          <SidebarNavigation
            key={e.id}
            label={e.name}
            onClick={() => setIsOpen(false)}
            selected={router.query.superTypeId === e.id.toString()}
            href={getLink('superType', {
              queries: { superTypeId: e.id, name: e.name },
            })}
          />
        ))}
      </SidebarGroup>
    </LayoutSidebar>
  );
};
