import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { StatsGlobalContainer } from '../../components/pages/stats/StatsGlobalContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';

import type { NextPageWithLayout } from '.././_app';

const StatsGlobal: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Stats" />
      <StatsGlobalContainer />
    </>
  );
};

StatsGlobal.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

StatsGlobal.namespaces = [...globalNamespaces];

export default StatsGlobal;
