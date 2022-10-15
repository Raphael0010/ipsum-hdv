import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { CraftContainer } from '../components/pages/craft/CraftContainer';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const Craft: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} title="Craft" />
      <CraftContainer />
    </>
  );
};

Craft.getLayout = (page: ReactNode): ReactNode => <AppLayout>{page}</AppLayout>;

Craft.namespaces = [...globalNamespaces];

export default Craft;
