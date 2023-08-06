import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';

export const metadata = {
  title: 'Page Not Found | Liberandum',
  description: 'Our excellant partners and how you can join too.',
};

export default function NotFoundPage() {
  return (
    <>
      <PageTitle
        title="Error"
        breadcrumbs={[
          { title: 'Home', link: '/' },
          { title: 'Error', link: '/' },
        ]}
      />
      <PageBody>
        <div className="text-center p-4">Page Not Found</div>
      </PageBody>
    </>
  );
}
