export default function About() {
  return (
    <section className="container px-4 py-20 mx-auto">
      <div className="grid items-center justify-center md:grid-cols-2 gap-8">
        <div className="mb-5 lg:mb-0">
          <figure className="about-image">
            <img src="/images/about-image-2.png" alt="" />
          </figure>
        </div>
        <div className="md:ml-4 lg:offset-1">
          <div className="mb-0">
            <h5 className="text-secondary font-bold">What we do</h5>
            <h2 className="text-6xl font-semibold my-6">
              Allow animals and humans to find there match
            </h2>
            <div className="mb-6">
              <p>
                We belive that animal shelters and rescues provide an excellant
                service to animals and humans but we think we can provide more
                by bringing a bit more tech to help bridge the gaps.
              </p>
            </div>
            <ul className="block">
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Smaller Shelters and rescues are harder to find
              </li>
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Submitting applications for multiple animals at different
                partners takes too much time
              </li>
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Repetative and time consuming work for matching animals with
                humans
              </li>
            </ul>
            <div className="my-7">
              <p>We aim to solve these pain points by;</p>
            </div>
            <ul className="block">
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Putting animals first, regardless of shelter or rescue
              </li>
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Humans can fill in their details once, then apply to as many
                animals as they like
              </li>
              <li className="block font-semibold">
                <i className="ri-checkbox-circle-line text-primary mr-2" /> -
                Match making Animals and Humans, and providing basic level
                background checks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
