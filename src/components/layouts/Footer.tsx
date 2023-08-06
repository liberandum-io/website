import { AnimalSpecies, AnimalStatusType } from '@prisma/client';
import Link from 'next-intl/link';

function FooterLink(props: { title: string; link: any }) {
  return (
    <li className="pb-1">
      <Link
        href={props.link}
        className="text-white font-bold hover:text-secondary"
      >
        {props.title}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark mt-20 text-white border-t-4 border-secondary">
      <div className="container px-4 mx-auto  pt-20 pb-0.5 flex flex-col justify-between">
        <div className="container">
          <div className="grid lg:grid-cols-12 col-span-6 gap-4 pb-4">
            <div className="col-span-4 pr-lg-5">
              <h4 className="font-bold text-2xl mb-1">About Us</h4>
              <p className="mb-4">
                Liberandum aims to help make the world a better place for
                animals (and humans) by offering secure, trusted services to all
                parties involved.
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h4 className="font-bold text-2xl mb-1">Explore</h4>
              <ul>
                <FooterLink title="Animals" link="/animals" />
                <FooterLink title="Partners" link="/partners" />
                <FooterLink title="About" link="/about" />
                {/* <FooterLink title="Contact" link="/contact" /> */}
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h4 className="font-bold text-2xl mb-1">Animals</h4>
              <ul className="nav-link">
                {Object.values(AnimalSpecies).map((species) => (
                  <FooterLink
                    key={species}
                    title={species}
                    link={`/animals?species=${species}&status=${AnimalStatusType.REHOMING}`}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-16 py-3 border-t border-primary">
        <div className="container px-4 mx-auto">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="copyright text-md-left mb-3 mb-md-0">
                © Liberandum 2023. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
