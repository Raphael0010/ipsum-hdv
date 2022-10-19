import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode, useState, useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { StatsServerContainer } from '../../components/pages/stats/StatsServerContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';
import { useRouter } from 'next/router';

import type { NextPageWithLayout } from '.././_app';

const StatsServer: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  const { query } = useRouter();
  const [servId, setServId] = useState<number | null>(null);
  const { serverId } = query;

  useEffect(() => {
    if (serverId && typeof serverId === 'string') {
      setServId(Number(serverId));
    }
  }, [serverId]);

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Stats" />
      <StatsServerContainer serverId={servId ?? 403} />
    </>
  );
};

StatsServer.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

StatsServer.namespaces = [...globalNamespaces];

export default StatsServer;
