'use client';

import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillRedditCircle,
  AiFillTwitterCircle,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

type ShareButtonProps = {
  title: string;
  url: string;
};

export default function ShareButtons(props: ShareButtonProps) {
  return (
    <div className="grid grid-cols-7">
      <EmailShareButton
        url={`mailto:?subject=${props.title}&body=${props.url}`}
      >
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <AiOutlineMail title="Email" className="text-2xl" />
        </span>
      </EmailShareButton>
      <FacebookShareButton
        url={props.url}
        hashtag="liberandum"
        quote={props.title}
      >
        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8nter h-9 w-9 rounded-full bg-blue-500 text-white -top-14 left-8">
          <AiFillFacebook title="Facebook" className="text-2xl" />
        </span>
      </FacebookShareButton>
      <LinkedinShareButton url={props.url} title={props.title}>
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <AiFillLinkedin title="LinkedIn" className="text-2xl" />
        </span>
      </LinkedinShareButton>
      <RedditShareButton url={props.url} title={props.title}>
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <AiFillRedditCircle title="Reddit" className="text-2xl" />
        </span>
      </RedditShareButton>
      <TelegramShareButton url={props.url} title={props.title}>
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <FaTelegramPlane title="Telegram" className="text-2xl" />
        </span>
      </TelegramShareButton>
      <TwitterShareButton url={props.url} title={props.title}>
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <AiFillTwitterCircle title="Twitter" className="text-2xl" />
        </span>
      </TwitterShareButton>
      <WhatsappShareButton url={props.url} title={props.title}>
        <span className="flex items-center justify-center h-9 w-9 rounded-full bg-blue-500 text-white hover:bg-secondary -top-14 left-8">
          <AiOutlineWhatsApp title="WhatsApp" className="text-2xl" />
        </span>
      </WhatsappShareButton>
    </div>
  );
}
