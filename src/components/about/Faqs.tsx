import Link from 'next-intl/link';

type FaqType = {
  title: React.ReactNode;
  description: React.ReactNode;
};

function Faq(props: FaqType) {
  return (
    <div className="bg-neutral-500 relative py-3 rounded-lg pl-20">
      <h4 className="text-lg faq-title font-extrabold cursor-pointer">
        {props.title}
      </h4>
      <div className="hidden">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default function Faqs() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="flex  flex-row-reverse items-center  flex-wrap">
        <div className="w-full lg:w-6/12 lg:offset-1  mb-lg-0">
          <div className="pb-5 mb-n3 ">
            <h5 className="anim_top text-secondary font-semibold">
              Asked Questions
            </h5>
            <h2 className="anim_top text-4xl lg:text-7xl font-bold mb-6">
              We are always Ready for your Any question
            </h2>
            <div className="mb-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-12 py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-6/12 md:pr-12">
          <div className="space-y-8">
            <Faq
              title="How to contact with our customer featire?"
              description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat explicabo, animi soluta veniam aspernatur ut iusto incidunt hic quas sequi dolores neque quis, sit odit minima modi nemo."
            />

            <Faq
              title="Is there any customer pricing system?"
              description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat explicabo, animi soluta veniam aspernatur ut iusto incidunt hic quas sequi dolores neque quis, sit odit minima modi nemo."
            />

            <Faq
              title="Where is the edit options on deshboard?"
              description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat explicabo, animi soluta veniam aspernatur ut iusto incidunt hic quas sequi dolores neque quis, sit odit minima modi nemo."
            />

            <Faq
              title="How to update the latest version?"
              description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat explicabo, animi soluta veniam aspernatur ut iusto incidunt hic quas sequi dolores neque quis, sit odit minima modi nemo."
            />

            <Faq
              title="Is there any customer pricing system?"
              description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat explicabo, animi soluta veniam aspernatur ut iusto incidunt hic quas sequi dolores neque quis, sit odit minima modi nemo."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
