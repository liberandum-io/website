export default function Contact() {
  return (
    <section className="py-20">
      <div className="container px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full">
            <div className="grid gap-8">
              <div className="w-full">
                <div className="bg-neutral-500 flex items-center">
                  <div className="overflow-hidden relative w-4/12 flex justify-start p-4">
                    <div className="flex justify-start relative">
                      <svg className="svg_element text-primary">
                        <use xlinkHref="#svg__element-10" />
                      </svg>
                      <i className="icon-phone absolute flex justify-center w-full h-full items-center text-white text-3xl" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg mb-2">Phone Us</h5>
                    <div className="info__box-desc text-blue-500">
                      <p>
                        <a href="+447915810750">+44 7915 810750</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-neutral-500 flex items-center">
                  <div className="overflow-hidden relative w-4/12 flex justify-start p-4">
                    <div className="flex justify-start relative">
                      <svg className="svg_element text-secondary">
                        <use xlinkHref="#svg__element-10" />
                      </svg>
                      <i className="icon-envelope absolute flex justify-center w-full h-full items-center text-white text-3xl" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg mb-2">
                      Email Drop Us
                    </h5>
                    <div className="info__box-desc">
                      <p>
                        <a
                          className="text-blue-500"
                          href="mailto:contact@liberandum.io"
                        >
                          contact@liberandum.io
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-neutral-500 flex items-center">
                  <div className="overflow-hidden relative w-4/12 flex justify-start p-4">
                    <div className="flex justify-start relative">
                      <svg className="svg_element text-tertiary">
                        <use xlinkHref="#svg__element-10" />
                      </svg>
                      <i className="icon-map-marker absolute flex justify-center w-full h-full items-center text-white text-3xl" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg mb-2">
                      Registered Address
                    </h5>
                    <div className="info__box-desc">
                      <p>
                        650 Anlaby Road, Kingston upon Hull,
                        <br />
                        HU3 6UU, United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <form className="bg-neutral-500 px-10 py-12" id="contact-form">
              <h3 className="text-4xl font-extrabold mb-8">
                Free Get In thouch
              </h3>
              <div className="flex gap-4 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="form-name"
                    className="w-full px-4 py-2 border border-gray-50 bg-white"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    name="form-email"
                    className="w-full px-4 py-2 border border-gray-50 bg-white"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-full">
                  <input
                    type="text"
                    name="form-subject"
                    className="w-full px-4 py-2 border border-gray-50 bg-white"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-full">
                  <textarea
                    name="form-message"
                    id="message"
                    className="w-full px-4 py-2 border border-gray-50 bg-white"
                    placeholder="Message"
                    defaultValue=""
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-12 py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <svg
          id="svg__element-10"
          viewBox="0 0 84 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M55.9021 12.339L55.9076 12.3259L55.9123 12.3125C56.0704 11.8653 56.2557 11.4437 56.4496 11.003L56.4528 10.9957C56.6353 10.5809 56.8255 10.1486 56.9918 9.68708C59.2048 6.49241 63.2718 4.85757 66.8939 5.73569L66.8938 5.73584L66.9059 5.73845C69.4369 6.28631 71.4356 8.01887 73.021 10.2847C74.6061 12.5502 75.7449 15.3029 76.5646 17.7953C79.5277 26.8748 81.4991 36.7577 81.6088 46.2793C81.7178 61.2118 75.7225 73.7805 63.8735 81.5056L63.8708 81.5074C48.0533 91.9642 26.006 85.4307 16.8731 68.1327L16.8728 68.1321C12.4227 59.7281 12.1214 48.4791 17.503 40.7162L17.5034 40.7156C21.0449 35.5933 27.1656 32.522 33.1621 32.7492L33.1658 32.7493C35.0142 32.8053 36.916 33.36 38.8279 34.0019C39.1896 34.1234 39.5526 34.2484 39.9157 34.3733C41.4441 34.8995 42.9735 35.4259 44.4127 35.6925C46.2086 36.025 47.9641 35.9751 49.5082 34.9697C51.0421 33.971 52.2677 32.0939 53.1646 29.0045C53.9244 26.5841 54.117 24.0101 54.3033 21.5208C54.3648 20.6991 54.4255 19.8867 54.5058 19.0921L54.5061 19.0888C54.7262 16.7542 55.0524 14.3667 55.9021 12.339Z"
            stroke="currentColor"
          />
          <path
            d="M34.4588 82.5524C46.5806 83.1368 58.9227 77.5264 69.0609 70.046C74.681 65.8382 80.0807 60.8123 82.3948 53.9162C85.26 45.8514 83.3866 36.7345 79.4195 29.2541C73.028 17.3321 61.8981 4.82571 49.1151 1.31924C37.6546 -1.83658 24.8716 0.73483 15.5048 8.33217C3.71365 17.6827 -1.57585 32.8774 0.407705 48.189C1.84028 59.059 6.68899 69.1109 15.1742 75.6563C21.2351 80.0978 27.847 82.3186 34.4588 82.5524Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
