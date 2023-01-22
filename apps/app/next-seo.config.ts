import type { NextSeoProps } from 'next-seo';

const seo: NextSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.ipsum-hdv.vercel.app/fr',
    siteName:
      'Ipsum HDV - La meilleure solution pour parcourir les hôtel de ventes de dofus touch en toute simplicité',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  titleTemplate: 'Ipsum HDV | %s',
  defaultTitle: 'Ipsum HDV',
  languageAlternates: [
    {
      href: 'https://www.ipsum-hdv.vercel.app/fr',
      hrefLang: 'fr-FR',
    },
  ],
};

export default seo;
