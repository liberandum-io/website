import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';

function Header() {
  const t = useTranslations('common');

  return (
    <nav className="bg-white relative z-50 w-full bg-white top-0 flex flex-wrap items-center justify-between px-2 py-3 shadow-lg border-b-4 border-primary">
      <div className="md:flex justify-between container px-4 mx-auto items-center py-4 ">
        <h2 className="text-4xl font-bold mb-4">
          <Link href="/" className="text-black hover:text-secondary">
            {t('project.title')}
          </Link>
        </h2>

        <nav className="md:flex">
          <ul className="space-x-3 flex overflow-visible">
            <li className="px-2">
              <Link href="/" className="font-bold hover:text-secondary">
                {t('menu.home')}
              </Link>
            </li>
            <li className="px-2">
              <Link href="/about" className="font-bold hover:text-secondary">
                {t('menu.about')}
              </Link>
            </li>
            <li className="px-2">
              <Link href="/animals" className="font-bold hover:text-secondary">
                {t('menu.animals')}
              </Link>
            </li>
            <li className="px-2">
              <Link href="/partners" className="font-bold hover:text-secondary">
                {t('menu.partners')}
              </Link>
            </li>
            {/* <li className="px-2">
                        <Link href="/contact" className="font-bold hover:text-secondary">
                          {t('menu.contact')}
                        </Link>
                        </li> */}
          </ul>
        </nav>
      </div>
    </nav>
  );
}

export default Header;
