import ContactSection from '@/components/contact/Contact';
import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';

export const metadata = {
  title: 'Contact | Liberandum',
  description: 'Get in touch with us!',
};

export default function ContactPage() {
  return (
    <>
      <PageTitle
        title="Contact"
        breadcrumbs={[
          { title: 'Home', link: '/' },
          { title: 'Contact', link: '/contact' },
        ]}
      />
      <PageBody>
        <ContactSection />
      </PageBody>
    </>
  );
}
