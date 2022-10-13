import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { ItemTypeContainer } from '../../components/pages/itemType/ItemTypeContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';

import type { NextPageWithLayout } from '../_app';

const ItemType: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const { query } = useRouter();
  const [typeId, setTypeId] = useState<number | null>(null);
  const { itemTypeId } = query;

  useEffect(() => {
    if (itemTypeId && typeof itemTypeId === 'string') {
      setTypeId(Number(itemTypeId));
    }
  }, [itemTypeId]);

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {/*<AuthShowcase />*/}
      {typeId && <ItemTypeContainer itemTypeId={typeId} />}
    </>
  );
};

ItemType.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

ItemType.namespaces = [...globalNamespaces];

export default ItemType;
