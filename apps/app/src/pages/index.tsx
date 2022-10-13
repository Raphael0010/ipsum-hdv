import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { HomeContainer } from '../components/pages/home';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Accueil" />
      <HomeContainer />
    </>
  );
};

Home.getLayout = (page: ReactNode): ReactNode => <AppLayout>{page}</AppLayout>;

Home.namespaces = [...globalNamespaces];

export default Home;
