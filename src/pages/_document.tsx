import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,500&display=swap"
          rel="stylesheet"
        />
        <meta
          content="Your one-stop shop for the latest products in electronics, fashion, and more. Shop now for the best deals and top-quality items."
          name="description"
        />
        <meta
          content="e-commerce, online store, electronics, fashion, best deals, top quality products, shop now, product listings"
          name="keywords"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />

        <meta
          content="E-commerce Product Listing Platform"
          property="og:title"
        />
        <meta content="article" property="og:type" />
        <meta
          content="Browse through a variety of categories and discover top-quality products at unbeatable prices. Our platform offers a seamless shopping experience."
          property="og:description"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
