/* eslint-disable jsx-a11y/control-has-associated-label */

export default function Gallery() {
  return (
    <section className="mt-8 bg-gray-50 py-20">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="text-center">
            <h5 className="text-lg text-secondary font-bold">Gallery</h5>
            <h2 className="text-4xl lg:text-6xl font-bold mt-1 mb-12">
              Our Photos Gallery
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 lg:row-span-2">
            <div className="relative group">
              <img
                src="images/gallery-3.jpg"
                className="w-full h-60 lg:h-auto object-cover bg-center"
                alt=""
              />
              <a
                href="images/gallery-3.jpg"
                className="absolute w-full h-full top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center z-10 text-white bg-secondary group-hover:opacity-80 opacity-0 text-3xl"
                data-lity
              >
                <i className="ri-zoom-in-line" />
              </a>
            </div>
          </div>
          <div className="grid lg:col-span-2 gap-4 lg:row-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="">
                <div className="relative group">
                  <img
                    src="images/gallery-2.jpg"
                    className="w-full h-60 lg:h-auto object-cover bg-center"
                    alt=""
                  />
                  <a
                    href="images/gallery-2.jpg"
                    className="absolute w-full h-full top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center z-10 text-white bg-secondary group-hover:opacity-80 opacity-0 text-3xl"
                    data-lity
                  >
                    <i className="ri-zoom-in-line" />
                  </a>
                </div>
              </div>
              <div className="">
                <div className="relative group">
                  <img
                    src="images/gallery-1.jpg"
                    className="w-full h-60 lg:h-auto object-cover bg-center"
                    alt=""
                  />
                  <a
                    href="images/gallery-1.jpg"
                    className="absolute w-full h-full top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center z-10 text-white bg-secondary group-hover:opacity-80 opacity-0 text-3xl"
                    data-lity
                  >
                    <i className="ri-zoom-in-line" />
                  </a>
                </div>
              </div>
            </div>
            <div className="">
              <div className="lg:col-span-2 ">
                <div className="relative group">
                  <img
                    src="images/gallery-4.jpg"
                    className="w-full h-60 lg:h-full object-cover bg-center"
                    alt=""
                  />
                  <a
                    href="images/gallery-4.jpg"
                    className="absolute w-full h-full top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center z-10 text-white bg-secondary group-hover:opacity-80 opacity-0 text-3xl"
                    data-lity
                  >
                    <i className="ri-zoom-in-line" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <a
              href="'"
              className="px-12 py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
