import { trpc } from '../../../utils/trpc';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import Link from 'next/link';
import { getLink } from '@ipsum-hdv/router/dist/app';
import { Label } from '@ipsum-hdv/ui/dist/components/text/label/Label';
import { Grid } from '@ipsum-hdv/ui/dist/core/pikas-ui/Grid';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { FC, useState } from 'react';
import { Textfield } from '@ipsum-hdv/ui/dist/components/inputs/textfield/Textfield';
import { NextSeo } from 'next-seo';

const ImgBox = styled('div', {
  justifyContent: 'center',
  display: 'flex',
  marginBottom: 10,
});

const ContentBx = styled('div', {
  textAlign: 'center',
  transition: '1s',
  zIndex: '10',
});

const Header = styled('div', {
  paddingBottom: '30px',

  textAlign: 'center',
});

type ItemProps = {
  itemTypeId: number;
};

export const ItemTypeContainer: FC<ItemProps> = ({ itemTypeId }) => {
  const [search, setSearch] = useState<string>('');
  const { data: item } = trpc.item.byTypeIdSearch.useQuery({
    id: itemTypeId,
    search,
  });

  const { data: categorieName } = trpc.item.getCategorieName.useQuery({
    id: itemTypeId,
  });

  return (
    <>
      <NextSeo title={categorieName?.name} />
      <div>
        <Header>
          <Title as="h1" css={{ h1: { paddingBottom: '20px' } }}>
            {categorieName?.name}
          </Title>
          <Textfield
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom de l'item"
            value={search}
          ></Textfield>
        </Header>
        {item && (
          <Grid
            css={{ alignItems: 'stretch', gridAutoRows: '1fr' }}
            type="container"
            cols={{ default: 12 }}
          >
            {item.map((e) => (
              <Grid
                key={e.id}
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '$BACKGROUND_LIGHTER',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  padding: '10px',
                }}
                type="item"
                cols={{ default: 12, xl: 2, lg: 4, md: 6, sm: 8, xs: 12 }}
              >
                <Link
                  key={e.id}
                  href={getLink('item', { queries: { itemId: e.id } })}
                  passHref
                >
                  <a>
                    <ImgBox>
                      {e.iconId && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={e.name}
                          height={100}
                          width={100}
                          src={`https://dofustouch.cdn.ankama.com/assets/2.42.2_U7k-aouuURq6Y4uGi0cvG.0puOIzszMT/gfx/items/${e.iconId}.png`}
                        />
                      )}
                    </ImgBox>
                    <ContentBx>
                      <Label>{e.name}</Label>
                    </ContentBx>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};
