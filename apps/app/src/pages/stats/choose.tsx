import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { StatsChooseContainer } from '../../components/pages/stats/StatsChooseContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';

import type { NextPageWithLayout } from '.././_app';

const StatsChoose: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Stats" />
      <StatsChooseContainer />
    </>
  );
};

StatsChoose.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

StatsChoose.namespaces = [...globalNamespaces];

export default StatsChoose;
