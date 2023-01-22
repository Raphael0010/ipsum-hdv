import { themeDefault } from '@ipsum-hdv/ui/dist/styles/theme-default';
import { customGlobalCss } from '@ipsum-hdv/ui/dist/styles/globalCss';
import type {
  Locales,
  Namespaces,
} from '@ipsum-hdv/translate/dist/i18n/i18n-types';
import { CustomTypesafeI18n } from '@ipsum-hdv/translate/dist/CustomTypesafeI18n/namespaceProvider';
import {
  baseLocale,
  detectLocale,
} from '@ipsum-hdv/translate/dist/i18n/i18n-util';
import { loadLocaleAsync } from '@ipsum-hdv/translate/dist/i18n/i18n-util.async';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import { PikasUIProvider } from '@ipsum-hdv/ui/dist/core/pikas-ui/Styles';
import type { Session } from 'next-auth';
import { StoreProvider } from '../store/hooks';
import { store } from '../store/store';
import { MetaHead } from '../components/global/MetaHead';
import { trpc } from '../utils/trpc';
import { useSwetrix } from '@swetrix/nextjs';

export type NextPageWithLayout<
  T extends Record<string, unknown> = Record<string, unknown>
> = NextPage<T> & {
  getLayout?: (page: ReactNode) => ReactNode;
  namespaces?: Namespaces[];
};

type AppPropsWithLayout = AppProps<{ session?: Session | null | undefined }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout): JSX.Element => {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode): ReactNode => page);

  const [locale, setLocale] = useState<Locales | undefined>(undefined);
  useSwetrix('zXGfmntcYa1o');

  customGlobalCss();

  useEffect(() => {
    const l = detectLocale(() => [router.locale ?? baseLocale]);

    loadLocaleAsync(l)
      .then(() => setLocale(l))
      .catch((e) => console.error(e));
  }, [router.locale]);

  return (
    <>
      <Head>
        <MetaHead />
      </Head>
      <DefaultSeo {...SEO} />
      <PikasUIProvider lightTheme={themeDefault}>
        <SessionProvider session={session}>
          <StoreProvider store={store}>
            {locale && (
              <CustomTypesafeI18n
                locale={locale}
                namespaces={Component.namespaces}
              >
                {getLayout(<Component {...pageProps} />)}
              </CustomTypesafeI18n>
            )}
          </StoreProvider>
        </SessionProvider>
      </PikasUIProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
