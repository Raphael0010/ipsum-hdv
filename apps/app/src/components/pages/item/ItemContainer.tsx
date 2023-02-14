import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { InfoDialog } from '@ipsum-hdv/ui/dist/core/pikas-ui/Dialog';
import { Table } from '@ipsum-hdv/ui/dist/core/pikas-ui/Table';
import { useState, FC } from 'react';
import { Label } from '@ipsum-hdv/ui/dist/components/text/label/Label';
import { getLink } from '@ipsum-hdv/router/dist/app';
import { Select } from '@ipsum-hdv/ui/dist/core/pikas-ui/Select';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLocalStorage } from 'usehooks-ts';
import { Grid } from '@ipsum-hdv/ui/dist/core/pikas-ui/Grid';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { NextSeo } from 'next-seo';
import { getServerName } from '../../../utils/server';
import Link from 'next/link';

const Container = styled('div', {});

const IngredientContainer = styled('div', {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flex: 4,
  backgroundColor: '$BACKGROUND_LIGHTER',
  borderRadius: '20px',
  overflow: 'hidden',
  padding: '10px',
});

const ImageContainer = styled('div', {
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

const CraftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  '@lg': {
    flexDirection: 'row',
  },
});

const GraphContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@lg': {
    flexDirection: 'row',
  },
});

const SelectContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
});

const Head = styled('div', {
  textAlign: 'center',
});

type LotsType = 'x1' | 'x10' | 'x100';

export const ItemContainer: FC = () => {
  const { query, push, locale } = useRouter();
  const itemId = Number(query.itemId?.toString() ?? '');
  const [serverId] = useLocalStorage('serverId', 401);
  const [formatPrice] = useState(Intl.NumberFormat(locale));

  const [craftFaux, setCraftFaux] = useState(true);

  const { data, isLoading } = trpc.item.pricesByItemId.useQuery({
    id: itemId,
    serverId,
  });

  const { data: itemCraft, isLoading: loadItemCraft } =
    trpc.item.getItemCraft.useQuery({
      itemId,
      serverId,
    });

  const [lot, setLot] = useState<LotsType>('x1');

  if (isLoading || loadItemCraft) {
    return null;
  }

  if (!data) {
    return (
      <InfoDialog
        visible={true}
        onClose={(): void => {
          void push(getLink('home'));
        }}
        title={'Aucune donnée !'}
        content={`(Item ${itemId} sur ${getServerName(serverId)})`}
      />
    );
  }

  return (
    <>
      {itemCraft?.ingredients.find((e) => e.x1 === 0) && (
        <InfoDialog
          visible={craftFaux}
          onClose={(): void => setCraftFaux(false)}
          title={'Prix de craft faux'}
          content={`L'ingrédient ${
            itemCraft.ingredients.find((e) => e.x1 === 0)?.name ?? ''
          } n'a pas de prix sur ${getServerName(serverId)}`}
        />
      )}
      <NextSeo title={data.name} />
      <Container>
        <Head>
          <Title as="h1" css={{ h1: { paddingBottom: '$5' } }}>
            {data.name}
          </Title>
          <CraftContainer>
            <ImageContainer>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={data.name}
                  height={100}
                  width={100}
                  src={`https://dofustouch.cdn.ankama.com/assets/2.42.2_U7k-aouuURq6Y4uGi0cvG.0puOIzszMT/gfx/items/${data.iconId}.png`}
                />
              }

              <Title as="h2" css={{ h2: { paddingTop: '$4' } }}>
                {formatPrice.format(data.prices[0].x1)}k
              </Title>
              <Label css={{ fontSize: '$EM-X-SMALL' }}>
                {data.prices.length} actualisations
              </Label>
            </ImageContainer>
            {itemCraft && (
              <IngredientContainer>
                <Title as="h3">
                  Prix de craft : {formatPrice.format(itemCraft.total)}
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      height={30}
                      style={{ verticalAlign: 'middle', marginLeft: '5px' }}
                      width={30}
                      alt="kamas"
                      src="/images/kama.png"
                    ></img>
                  }
                </Title>
                <Label
                  css={{
                    color: itemCraft.profit > 0 ? 'green' : 'red',
                    paddingBottom: '$4',
                  }}
                >
                  {itemCraft.profit > 0 ? '+' : ''}
                  {formatPrice.format(itemCraft.profit)}k (x
                  {itemCraft.profitRatio.toFixed(2)})
                </Label>
                <Grid
                  css={{ alignItems: 'stretch', gridAutoRows: '1fr' }}
                  type="container"
                  cols={{ default: 12 }}
                >
                  {itemCraft.ingredients.map((i, idx) => (
                    <Grid
                      key={idx}
                      css={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        alignItems: 'center',
                        backgroundColor:
                          i.x1 === 0 ? '#e24964' : '$BLACK_LIGHT',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        padding: '10px',
                      }}
                      type="item"
                      cols={{ default: 12, lg: 6, xl: 3 }}
                    >
                      <Link
                        href={getLink('item', { queries: { itemId: i.id } })}
                      >
                        <Label css={{ fontSize: '$EM-X-SMALL' }}>
                          {
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              alt={data.name}
                              height={50}
                              style={{
                                verticalAlign: 'middle',
                              }}
                              width={50}
                              src={`https://dofustouch.cdn.ankama.com/assets/2.42.2_U7k-aouuURq6Y4uGi0cvG.0puOIzszMT/gfx/items/${i.iconId}.png`}
                            />
                          }
                          <span
                            style={{
                              backgroundColor: '#292E36',
                              borderRadius: '10px',
                              padding: '5px',
                            }}
                          >
                            x{i.quantity}
                          </span>
                        </Label>
                        <Label>{i.name}</Label>
                        <Label css={{ fontSize: '$EM-X-SMALL' }}>
                          Prix unitaire : {formatPrice.format(i.x1)}
                        </Label>
                        <Label css={{ fontSize: '$EM-X-SMALL' }}>
                          Prix total : {formatPrice.format(i.total)}
                        </Label>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </IngredientContainer>
            )}
          </CraftContainer>
        </Head>
        <div style={{ paddingTop: '20px' }}>
          <Title
            as="h3"
            css={{
              h3: {
                padding: '$3',
                justifyContent: 'center',
                textAlign: 'center',
              },
            }}
          >
            Graphique d'évolution du prix pour le lot {lot}
          </Title>
          <GraphContainer>
            <SelectContainer>
              <Label>Quantitée</Label>
              <Select
                onChange={(e) => setLot(e.toString() as LotsType)}
                defaultValue={lot}
                width="auto"
                css={{
                  container: {
                    padding: '10px',
                  },
                }}
                data={[
                  {
                    items: [
                      {
                        label: 'X1',
                        value: 'x1',
                      },
                      {
                        label: 'X10',
                        value: 'x10',
                      },
                      {
                        label: 'X100',
                        value: 'x100',
                      },
                    ],
                  },
                ]}
              />
            </SelectContainer>

            <ResponsiveContainer width={'100%'} height={300}>
              <LineChart
                data={data.prices
                  .filter((e) => e[lot] !== 0)
                  .map((i) => ({
                    createdAt: i.createdAt,
                    average: i.average,
                    [lot]: i[lot],
                  }))
                  .sort(
                    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
                  )}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={(d: { createdAt: Date }) =>
                    d.createdAt.toLocaleString('fr')
                  }
                />
                <YAxis scale="log" domain={['auto', 'auto']} />
                <Tooltip formatter={(e: number) => formatPrice.format(e)} />
                <Legend />

                <Line type="monotone" dataKey={lot} stroke="#8884d8" />
                {lot === 'x1' && (
                  <Line type="monotone" dataKey="average" stroke="#fcba03" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </GraphContainer>

          <Title
            as="h3"
            css={{
              h3: {
                padding: '$5',
                justifyContent: 'center',
                textAlign: 'center',
              },
            }}
          >
            Tableau d'évolution du prix
          </Title>
          <Table
            data={data.prices}
            variant="light"
            css={{
              tr: {
                '&:nth-child(odd)': {
                  backgroundColor: '$BACKGROUND_LIGHTER',
                },
              },
              container: {
                paddingBottom: '30px',
                borderRadius: '3px',
              },
              table: {
                color: '$WHITE',
              },
              pagination: {
                buttonChevronLeft: {
                  color: '$WHITE',
                },
                buttonChevronsRight: {
                  color: '$WHITE',
                },
                buttonChevronRight: {
                  color: '$WHITE',
                },
                buttonChevronsLeft: {
                  color: '$WHITE',
                },
                pageNumber: {
                  color: '$WHITE',
                },
              },
            }}
            emptyMessage="Aucune donnée pour cet item"
            pagination={{
              active: true,
            }}
            columns={[
              {
                header: 'x1',
                accessorKey: 'x1',
                accessorFn: (p) => formatPrice.format(p.x1),
              },
              {
                header: 'x10',
                accessorKey: 'x10',
                accessorFn: (p) => formatPrice.format(p.x10),
              },
              {
                header: 'x100',
                accessorKey: 'x100',
                accessorFn: (p) => formatPrice.format(p.x100),
              },
              {
                header: 'Average',
                accessorKey: 'average',
                accessorFn: (p) => formatPrice.format(p.average),
              },
              {
                header: 'Date',
                accessorFn: (p) => p.createdAt.toLocaleString('fr'),
              },
            ]}
          />
        </div>
      </Container>
    </>
  );
};
