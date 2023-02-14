import { FC, useState } from 'react';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { Select } from '@ipsum-hdv/ui/dist/core/pikas-ui/Select';
import { Label } from '@ipsum-hdv/ui/dist/components/text/label/Label';
import { EJob, jobsFilter } from '../../../utils/job';
import { Button } from '@ipsum-hdv/ui/dist/components/inputs/button/index';
import { trpc } from '../../../utils/trpc';
import { useLocalStorage } from 'usehooks-ts';
import { Grid } from '@ipsum-hdv/ui/dist/core/pikas-ui/Grid';
import Link from 'next/link';
import { getLink } from '@ipsum-hdv/router/dist/app';

const Head = styled('div', {
  textAlign: 'center',
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

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  '@lg': {
    flexDirection: 'row',
  },
});

const SContainer = styled('div', {
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'normal',
  display: 'flex',
  padding: '$5',
  flex: 1,
  backgroundColor: '$BACKGROUND_LIGHTER',
  borderRadius: '20px',
  overflow: 'hidden',
});

export const CraftContainer: FC = () => {
  const [serverId] = useLocalStorage('serverId', 401);
  const [nbCase, setNbCase] = useState<number>(-1);
  const [job, setJob] = useState<EJob>(-1);
  const [benefice, setBenefice] = useState<number>(2);
  const [isSearchable, setIsSearchable] = useState<boolean>(false);

  const { data, isLoading: loadingData } = trpc.craft.craftOptimizer.useQuery(
    {
      nbCase,
      job,
      benefice,
      serverId,
    },
    {
      refetchOnWindowFocus: false,
      enabled: isSearchable,
      onSuccess: () => setIsSearchable(false),
    }
  );

  return (
    <div>
      <Head>
        <Title
          as="h1"
          css={{ h1: { paddingBottom: '30px', paddingTop: '10px' } }}
        >
          CraftOptimizer
        </Title>
      </Head>
      <Container>
        <SContainer>
          <Label>Nombres de cases</Label>
          <Select
            onChange={(e) => setNbCase(Number(e))}
            defaultValue={nbCase.toString()}
            css={{
              container: {
                paddingBottom: '10px',
              },
            }}
            width="auto"
            data={[
              {
                name: 'Nombre de cases',
                items: [
                  {
                    label: 'Aucun filtre',
                    value: '-1',
                  },
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                  {
                    label: '4',
                    value: '4',
                  },
                  {
                    label: '5',
                    value: '5',
                  },
                  {
                    label: '6',
                    value: '6',
                  },
                  {
                    label: '7',
                    value: '7',
                  },
                  {
                    label: '8',
                    value: '8',
                  },
                ],
              },
            ]}
          />

          <Label>Métier</Label>
          <Select
            onChange={(e) => setJob(Number(e))}
            defaultValue={job.toString()}
            width="auto"
            css={{
              container: {
                paddingBottom: '10px',
              },
            }}
            data={[
              {
                name: 'Métier',
                items: jobsFilter.map((e) => ({
                  label: e.name,
                  value: e.jobId.toString(),
                })),
              },
            ]}
          />

          <Label>Bénéfice</Label>
          <Select
            onChange={(e) => setBenefice(Number(e))}
            defaultValue={benefice.toString()}
            width="auto"
            css={{
              container: {
                paddingBottom: '10px',
              },
            }}
            data={[
              {
                items: [
                  {
                    label: 'Ratio',
                    value: '1',
                  },
                  {
                    label: 'Kamas',
                    value: '2',
                  },
                ],
              },
            ]}
          />
          <Button
            type="submit"
            style={{ marginTop: 8 }}
            onClick={() => setIsSearchable(true)}
          >
            Optimisation
          </Button>
        </SContainer>
      </Container>
      <Grid
        css={{ alignItems: 'stretch', gridAutoRows: '1fr', paddingTop: '$5' }}
        type="container"
        cols={{ default: 12 }}
      >
        {loadingData && isSearchable && (
          <Grid
            css={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '$BACKGROUND_LIGHTER',
              borderRadius: '20px',
              overflow: 'hidden',
              padding: '10px',
            }}
            type="item"
            cols={{ default: 12 }}
          >
            <ImgBox>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="charge"
                  height={100}
                  width={100}
                  src={`/images/joris.png`}
                />
              }
            </ImgBox>
            <ContentBx>
              <Label>Je charge les données !</Label>
            </ContentBx>
          </Grid>
        )}
        {data?.length === 0 && (
          <Grid
            css={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '$BACKGROUND_LIGHTER',
              borderRadius: '20px',
              overflow: 'hidden',
              padding: '10px',
            }}
            type="item"
            cols={{ default: 12 }}
          >
            <ImgBox>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="charge"
                  height={100}
                  width={100}
                  src={`/images/joris.png`}
                />
              }
            </ImgBox>
            <ContentBx>
              <Label>Aucune donnée !</Label>
            </ContentBx>
          </Grid>
        )}
        {data && (
          <>
            {data.map((e) => (
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
                </Link>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};
