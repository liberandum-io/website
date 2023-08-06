import AboutSection from '@/components/about/About';
import Counters from '@/components/about/Counters';
import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';

export const metadata = {
  title: 'About Us | Liberandum',
  description: 'Who we are, what we do, and what we aim to do!',
};

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About"
        breadcrumbs={[
          { title: 'Home', link: '/' },
          { title: 'About', link: '/about' },
        ]}
      />
      <PageBody>
        <AboutSection />
        <Counters />
      </PageBody>
    </>
  );
}
