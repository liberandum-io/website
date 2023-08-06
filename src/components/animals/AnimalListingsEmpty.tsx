import { BsBinocularsFill } from 'react-icons/bs';

export default function AnimalListingsEmpty() {
  return (
    <h2 className="text-center text-4xl lg:pt-8">
      No Animals to show...
      <br />
      <BsBinocularsFill className="inline-block text-8xl text-primary mt-8" />
    </h2>
  );
}
