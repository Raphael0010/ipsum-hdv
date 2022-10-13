import { getCssText } from '@ipsum-hdv/ui';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import GithubCorner from 'react-github-corner';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <GithubCorner
            style={{ position: 'fixed', top: 0, right: 0 }}
            href="https://github.com/Raphael0010/ipsum-hdv"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
