import { useI18nContext } from '@ipsum-hdv/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { SuperTypeContainer } from '../../components/pages/superType/SuperTypeContainer';
import { globalNamespaces } from '../../configs/globalNamespaces';

import type { NextPageWithLayout } from '../_app';

const SuperType: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const { query } = useRouter();
  const [typeId, setTypeId] = useState<number | null>(null);
  const [typeName, setTypeName] = useState<string | null>(null);
  const { superTypeId, name } = query;

  useEffect(() => {
    if (superTypeId && typeof superTypeId === 'string') {
      setTypeId(Number(superTypeId));
    }
  }, [superTypeId]);

  useEffect(() => {
    if (name && typeof name === 'string') {
      setTypeName(name);
    }
  }, [name]);

  if (!typeName || !typeId) {
    return null;
  }

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {/*<AuthShowcase />*/}
      {typeId && <SuperTypeContainer superTypeId={typeId} name={typeName} />}
    </>
  );
};

SuperType.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

SuperType.namespaces = [...globalNamespaces];

export default SuperType;
