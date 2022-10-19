import { FC, useState } from 'react';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { trpc } from '../../../utils/trpc';
import { timeAgo } from '../../../utils/date';
import { useRouter } from 'next/router';
import { CustomDialog } from '@ipsum-hdv/ui/dist/core/pikas-ui/Dialog';
import { PacmanLoader } from '@ipsum-hdv/ui/dist/core/pikas-ui/Loader';

const Container = styled('div', {});

const HeadContainer = styled('div', {
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
  alignItems: 'center',
  display: 'flex',
  padding: '$5',
  flex: 1,
  backgroundColor: '$BACKGROUND_LIGHTER',
  borderRadius: '20px',
  overflow: 'hidden',
});

const Head = styled('div', {
  textAlign: 'center',
});

export const StatsGlobalContainer: FC = () => {
  const { locale } = useRouter();
  const [formatPrice] = useState(Intl.NumberFormat(locale));
  const { data: lastUpdate, isLoading: loadingLastUpdate } =
    trpc.stats.getLastUpdate.useQuery({});

  const { data: amountOfPrice, isLoading: loadingAmountOfPrice } =
    trpc.stats.getAmountOfPrice.useQuery({});

  if (loadingAmountOfPrice || loadingLastUpdate) {
    return (
      <Container>
        <CustomDialog
          visible={true}
          header={<h2>Nous chargeons les statistiques !</h2>}
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
      <Head>
        <Title
          as="h1"
          css={{ h1: { paddingBottom: '30px', paddingTop: '10px' } }}
        >
          Statistiques global
        </Title>
        <HeadContainer>
          <SContainer>
            <Title as="h3">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="ref"
                  height={70}
                  style={{ verticalAlign: 'middle' }}
                  width={70}
                  src={`/images/pvp_dq.png`}
                />
              }{' '}
              {`Dernière actualisation ${timeAgo(
                lastUpdate?.createdAt ?? new Date(),
                locale ?? 'fr'
              )}`}
            </Title>
          </SContainer>
          <SContainer>
            <Title as="h3">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt="ref"
                  height={70}
                  style={{ verticalAlign: 'middle' }}
                  width={70}
                  src={`/images/general_dq.png`}
                />
              }{' '}
              {formatPrice.format(amountOfPrice ?? 0)} prix référencés
            </Title>
          </SContainer>
        </HeadContainer>
      </Head>
    </Container>
  );
};
