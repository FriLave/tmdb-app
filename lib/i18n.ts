import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'fr'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  console.log(locale);
  if (!locales.includes(locale)) notFound();

  console.log((await import(`../messages/${locale}.json`)).default);
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
