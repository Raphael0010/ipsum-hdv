import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { AlmanaxContainer } from '../components/pages/almanax/AlmanaxContainer';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const Alamanax: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Alamanax" />
      <AlmanaxContainer />
    </>
  );
};

Alamanax.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

Alamanax.namespaces = [...globalNamespaces];

export default Alamanax;
