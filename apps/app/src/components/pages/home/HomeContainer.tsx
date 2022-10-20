import { FC, useState } from 'react';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { Separator } from '@ipsum-hdv/ui/dist/core/pikas-ui/Separator';
import { Textfield } from '@ipsum-hdv/ui/dist/components/inputs/textfield/Textfield';
import { trpc } from '../../../utils/trpc';
import { Grid } from '@ipsum-hdv/ui/dist/core/pikas-ui/Grid';
import Link from 'next/link';
import { getLink } from '@ipsum-hdv/router/dist/app';
import { Label } from '@ipsum-hdv/ui/dist/components/text/label/Label';
import { useDebounce } from 'usehooks-ts';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
const Container = styled('div', {});

const CraftStatsContainer = styled('a', {
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  padding: '$5',
  flex: 1,
  backgroundColor: '$BACKGROUND_LIGHTER',
  borderRadius: '20px',
  overflow: 'hidden',
});

const HeadContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  '@lg': {
    flexDirection: 'row',
  },
});

const Head = styled('div', {
  textAlign: 'center',
});

const TextBlock = styled('p', {
  padding: '4px',
  color: '$WHITE',
});

const Search = styled('div', {
  color: '$WHITE',
});

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

export const HomeContainer: FC = () => {
  const [search, setSearch] = useState<string>('');

  const debouncedValue = useDebounce<string>(search, 500);

  const { data: item } = trpc.item.allItemsByName.useQuery(
    {
      search: debouncedValue,
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <Container>
      <Head>
        <Title
          as="h1"
          css={{ h1: { paddingBottom: '30px', paddingTop: '10px' } }}
        >
          Bienvenue sur l'hôtel des ventes IPSUM
        </Title>
        <HeadContainer>
          <Link href={getLink('craft')} passHref>
            <CraftStatsContainer>
              <Title as="h2">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    height={50}
                    style={{ verticalAlign: 'middle' }}
                    width={50}
                    alt="craft"
                    src="images/jobIcone.png"
                  ></img>
                }{' '}
                Craft
              </Title>
            </CraftStatsContainer>
          </Link>
          <Link href={getLink('statsChoose')} passHref>
            <CraftStatsContainer>
              <Title as="h2">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    height={40}
                    style={{ verticalAlign: 'middle' }}
                    width={40}
                    alt="stats"
                    src="images/statsIcone.png"
                  ></img>
                }{' '}
                Statistiques
              </Title>
            </CraftStatsContainer>
          </Link>
          <Link href={getLink('almanax')} passHref>
            <CraftStatsContainer>
              <Title as="h2">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    height={60}
                    style={{ verticalAlign: 'middle' }}
                    width={40}
                    alt="alama"
                    src="images/alamaIcone.webp"
                  ></img>
                }{' '}
                Almanax
              </Title>
            </CraftStatsContainer>
          </Link>
        </HeadContainer>

        <TextBlock css={{ paddingTop: '20px' }}>
          Nous sommes sur{' '}
          <a
            href="https://discord.gg/ms432w6BHz"
            target={'_blank'}
            rel="noreferrer"
            style={{
              color: '#5865F2',
            }}
          >
            <b>Discord</b>
          </a>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              height={20}
              style={{ verticalAlign: 'middle', marginLeft: '5px' }}
              width={20}
              alt="discord"
              src="images/discord-logo-4-1.png"
            ></img>
          }
        </TextBlock>
      </Head>
      <Separator
        size={1}
        css={{
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <Search>
        <h3 style={{ textAlign: 'center' }}>
          Tu cherche un item en particulier ?
        </h3>
        <Textfield
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Nom de l'item"
          css={{
            container: {
              padding: '20px',
            },
          }}
        ></Textfield>
      </Search>

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
    </Container>
  );
};
