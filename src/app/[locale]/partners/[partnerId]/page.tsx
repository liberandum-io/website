import PageBody from '@/components/layouts/PageBody';
import PageTitle from '@/components/layouts/PageTitle';
import PartnerDetails from '@/components/partners/Detail';
import prisma from '@/lib/prisma';
import { Metadata, ResolvingMetadata } from 'next';
import { title } from 'process';

type PartnerViewPageProps = {
  params: { partnerId: string };
}

async function getPartner(id: string) {
  return await prisma.partner.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      parent: true,
      branches: true,
    },
  });
}

export async function generateMetadata(
  props: PartnerViewPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const partner = await getPartner(props.params.partnerId);
  const parentData = await parent;

  const title: string[] = [];
  title.push(partner.name);
  if (partner.parent) {
    title.push(partner.parent.name);
  }
  title.push('Partners');
  title.push(parentData.title!.absolute);

  return {
    title: title.join(' | '),
  }
}

export default async function PartnerViewPage(props: PartnerViewPageProps) {
  const partner = await getPartner(props.params.partnerId);

  const breadcrumbs = [
    { title: 'Home', link: '/' },
    { title: 'Partners', link: '/partners' },
  ];
  if (partner.parent) {
    breadcrumbs.push({
      title: partner.parent.name,
      link: `/partners/${partner.parent.id}`,
    });
  }
  breadcrumbs.push({
    title: partner.name,
    link: `/partners/${partner.id}`,
  });
  return (
    <>
      <PageTitle
        title={partner.name}
        breadcrumbs={breadcrumbs}
      />
      <PageBody>
        <PartnerDetails partner={partner} />
      </PageBody>
    </>
  );
}
