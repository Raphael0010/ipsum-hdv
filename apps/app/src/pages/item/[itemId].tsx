import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { ItemContainer } from '../../components/pages/item/ItemContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';

import type { NextPageWithLayout } from '../_app';

const ItemType: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {/*<AuthShowcase />*/}
      <ItemContainer />
    </>
  );
};

ItemType.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

ItemType.namespaces = [...globalNamespaces];

export default ItemType;
