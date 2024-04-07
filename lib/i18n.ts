import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { createLocalizedPathnamesNavigation, Pathnames } from "next-intl/navigation";


export const locales = ['en', 'fr'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) notFound();

  console.log(`../messages/${locale}.json`);
  console.log((await import(`../messages/${locale}.json`)).Authentication);
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});


export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    fr: '/noms-de-chemin'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;


export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix
  });
