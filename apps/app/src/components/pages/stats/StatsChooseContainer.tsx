import { FC } from 'react';
import { styled } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import { Title } from '@ipsum-hdv/ui/dist/components/title/Title';
import { useLocalStorage } from 'usehooks-ts';
import { getServerName } from '../../../utils/server';
import { getLink } from '@ipsum-hdv/router/dist/app';
import Link from 'next/link';

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

const ImgBox = styled('div', {
  justifyContent: 'center',
  display: 'flex',
  marginBottom: 10,
});

const SContainer = styled('a', {
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

export const StatsChooseContainer: FC = () => {
  const [serverId] = useLocalStorage('serverId', 401);

  return (
    <Container>
      <Head>
        <Title
          as="h1"
          css={{ h1: { paddingBottom: '30px', paddingTop: '10px' } }}
        >
          Statistiques
        </Title>
        <HeadContainer>
          <Link href={getLink('statsGlobal')} passHref legacyBehavior>
            <SContainer>
              <Title as="h3">
                <ImgBox>
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt="chat"
                      height={100}
                      width={100}
                      src={`/images/server.webp`}
                    />
                  }
                </ImgBox>
                <Title as="h2">Global</Title>
              </Title>
            </SContainer>
          </Link>
          <Link
            href={getLink('statsServer', { queries: { serverId } })}
            passHref
            legacyBehavior
          >
            <SContainer>
              <Title as="h3">
                <ImgBox>
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt="chat"
                      style={{ borderRadius: '20%' }}
                      height={120}
                      width={100}
                      src={`https://dofustouch.cdn.ankama.com/assets/2.42.3_YS00.Ek29eE.aaUEUOR6keJUGu*orU0C/gfx/illus/illu_${serverId}.png`}
                    />
                  }
                </ImgBox>
                <Title as="h2">{getServerName(serverId)}</Title>
              </Title>
            </SContainer>
          </Link>
        </HeadContainer>
      </Head>
    </Container>
  );
};
