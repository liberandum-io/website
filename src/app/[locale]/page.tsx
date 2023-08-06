import Counters from '@/components/about/Counters';
import Banner from '@/components/home/Banner';

export const metadata = {
  title: 'Animal Rehoming, Adoption and Rescue | Liberandum',
  description:
    'We aim to make the world a better place for animals (and humans)!',
};

export default function HomePage() {
  return (
    <>
      <Banner />
      <Counters />
    </>
  );
}
