import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import BetaNotice from '@/components/layouts/BetaNotice';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Liberandum',
  description: 'Making the World a better place for Animals (and Humans)',
  applicationName: 'Liverandum.io',
  authors: [
    {name: 'Paul Happy Hutchinson', url: 'https://www.lexiphanic.co.uk'}
  ],
  generator: 'Liberandum.io',
  referrer: 'no-referrer',
  creator: 'Liberandum.io',
  publisher: 'Liberandum.io',
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.liberandum.io",
    title: "Liberandum",
    description: "Making the world a better place for animals (and Humans).",
    siteName: "Liberandum.io",
    locale: "en_US",
    images: [],
  },
};

export default async function RootLayout(props: { children: React.ReactNode, params: { locale: string } }) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={props.params.locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BetaNotice />
          <Header />
          {props.children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
