import { AiFillExclamationCircle } from 'react-icons/ai';

export default function AlertError(props: { children: React.ReactNode }) {
  return (
    <div className="w-full my-6 text-white bg-red-500">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex">
          <AiFillExclamationCircle className="w-6 h-6 fill-current" />
          <p className="mx-3">{props.children}</p>
        </div>
      </div>
    </div>
  );
}
