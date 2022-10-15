import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { StatsContainer } from '../components/pages/stats/StatsContainer';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const Stats: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Stats" />
      <StatsContainer />
    </>
  );
};

Stats.getLayout = (page: ReactNode): ReactNode => <AppLayout>{page}</AppLayout>;

Stats.namespaces = [...globalNamespaces];

export default Stats;
