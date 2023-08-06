type PostProps = {
  publisher: string;
  description: string;
  title: string;
  img: string;
};

function Post(props: PostProps) {
  return (
    <div className="swiper-slide">
      <div className="posts_box v2">
        <figure className="group overflow-hidden">
          <img
            src={props.img}
            alt=""
            className="group-hover:scale-125 group-hover:rotate-6 transition duration-500"
          />
        </figure>
        <div className="px-4 py-4 bg-neutral-500 mx-4 -translate-y-10">
          <ul className="meta_list">
            <li>
              <span className="icon">
                <span className="ri-user-3-line" />
              </span>
              <span className="opacity-80">
                By
                {props.publisher}
              </span>
            </li>
          </ul>
          <h4 className="font-black text-xl my-4 hover:text-primary">
            <a href="/" className="hover:text-primary">
              {props.title}
            </a>
          </h4>
          <div className="desc hidden">{props.description}</div>
          <a href="single-post.html" className="arrow-button">
            Load More
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Posts() {
  return (
    <section className="py-32">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="flex">
          <div className="w-full">
            <div className="text-center">
              <h5 className="text-lg text-secondary font-semibold">
                Posts Petcare
              </h5>
              <h2 className="text-4xl md:text-6xl font-bold w-8/12 mx-auto mb-12">
                Everyday update here About petcate
              </h2>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Post
                img="https://placedog.net/570/390"
                publisher="John Smith"
                description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit"
                title="Fun Ways to Exercise With Your pet"
              />

              <Post
                img="https://placedog.net/570/393"
                publisher="John Smith"
                description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit"
                title="Signs Your Dog Might Have Osteoarthritis"
              />

              <Post
                img="https://placedog.net/575/390"
                publisher="John Smith"
                description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit"
                title="How to Get Pee Smell Out of Carpet?"
              />

              <div style={{ clear: 'both' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
