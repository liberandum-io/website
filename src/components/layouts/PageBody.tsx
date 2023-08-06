import type { ReactNode } from 'react';

interface PageBodyProps {
  children: ReactNode;
}

export default function PageBody(props: PageBodyProps) {
  return <div className="container px-4 mx-auto">{props.children}</div>;
}
