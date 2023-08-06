export default function Testimonials() {
  return (
    <section className="py-20 bg-neutral-50 relative overflow__hidden">
      <div className="container px-4 sm:px-20 lg:px-0">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <div className="pb-5 mb-3 text-center lg:text-left">
              <h5 className="lg:text-left font-semibold text-secondary mb-2">
                Testimonial
              </h5>
              <h2 className="lg:text-left text-6xl font-extrabold mb-6">
                Client happy With Us
              </h2>
              <div className="lg:text-left">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                </p>
              </div>
            </div>
            <div
              className="flex space-x-2 justify-center lg:justify-start mb-4 lg:mb-0"
              id="testimonial-arrow"
            >
              {/* <SliderButton />
                            <SliderButton side="right" /> */}
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <div className="swiper-container px-4 testimonial_slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="bg-white py-8 relative px-6 rounded-2xl">
                    <div className="testimonial__box-image">
                      <img
                        src="images/testi-1.jpg"
                        className="rounded-full w-28 h-28 border-4 border-primary mb-6"
                        alt=""
                      />
                    </div>
                    <div className="absolute right-0 top-0 p-10 text-6xl text-primary opacity-50">
                      <i className="icon-quote " />
                    </div>
                    <div className="text-sm opacity-50 mb-4">
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa
                      </p>
                    </div>
                    <h5 className="font-semibold mb-1">Agnes C Brewer</h5>
                    <h6 className="font-bold text-secondary">CEO of LLC</h6>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__box">
                    <div className="testimonial__box-image">
                      <img src="images/testi-2.jpg" alt="" />
                    </div>
                    <div className="testimonial__box-quote">
                      <i className="icon-quote" />
                    </div>
                    <div className="testimonial__box-desc">
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa
                      </p>
                    </div>
                    <h5 className="testimonial__box-name">John R Bennett</h5>
                    <h6 className="testimonial__box-position">CEO of TTM</h6>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__box">
                    <div className="testimonial__box-image">
                      <img src="images/testi-3.jpg" alt="" />
                    </div>
                    <div className="testimonial__box-quote">
                      <i className="icon-quote" />
                    </div>
                    <div className="testimonial__box-desc">
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa
                      </p>
                    </div>
                    <h5 className="testimonial__box-name">Beatrice R Clark</h5>
                    <h6 className="testimonial__box-position">CEO of KKR</h6>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__box">
                    <div className="testimonial__box-image">
                      <img src="images/testi-4.jpg" alt="" />
                    </div>
                    <div className="testimonial__box-quote">
                      <i className="icon-quote" />
                    </div>
                    <div className="testimonial__box-desc">
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa
                      </p>
                    </div>
                    <h5 className="testimonial__box-name">Elvia E Arruda</h5>
                    <h6 className="testimonial__box-position">CEO of BBC</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
