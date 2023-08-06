import type { Partner } from '@prisma/client';
import Link from 'next-intl/link';

type WidgetProps = {
  partner: Partner;
  title: React.ReactNode;
};

export default function WidgetAnimalOwner(props: WidgetProps) {
  return (
    <div className="widget widget_categories">
      <h5 className="widget-title">{props.title}</h5>
      <ul>
        <li className="cat-item">
          <Link href={`/partners/${props.partner.id}`}>
            Name:
            {props.partner.name}
          </Link>
        </li>
      </ul>
    </div>
  );
}
