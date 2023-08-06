import getStats from '@/app/api/stats/getStats';

type CounterBoxProps = {
  icon: string;
  title: string;
  counter: number;
  className: string;
};

function CounterBox(props: CounterBoxProps) {
  return (
    <div className={`py-5 ${props.className}`}>
      <div className="h-full flex flex-col justify-center items-center ">
        <div className="counter__box-icon">
          <i className={`${props.icon} text-6xl text-white`} />
        </div>
        <h3 className="text-5xl font-extrabold my-4 text-white">
          {props.counter > 1000
            ? `${Math.floor(props.counter / 1000)}k+`
            : props.counter}
        </h3>
        <h5 className="text-white">{props.title}</h5>
      </div>
    </div>
  );
}

export default async function Counters() {
  const stats = await getStats();

  return (
    <div className="container px-4 my-40 max-w-6xl mx-auto">
      <div className="sm:grid-cols-2 grid gap-4 md:grid-cols-3">
        <CounterBox
          icon="icon-mobile"
          title="Photos"
          counter={stats.mediaCount}
          className="bg-secondary w-full mr-2 "
        />

        <CounterBox
          icon="icon-dog"
          title="Animals"
          counter={stats.animalCount}
          className="bg-primary w-full "
        />

        <CounterBox
          icon="icon-hand-sheak"
          title="Partners"
          counter={stats.partnerCount}
          className="bg-tertiary w-full col-span-1 sm:col-span-2 md:col-span-1"
        />
      </div>
    </div>
  );
}
