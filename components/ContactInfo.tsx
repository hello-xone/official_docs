import { EXTERNAL_LINKS } from "@lib/external";

const ContactInfo = () => {
  return (
    <div className="space-y-2 text-xm mt-8">
      <h3>For any help or support, please contact us:</h3>
      <p>
        <strong>Support:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Support}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Support}
        </a>
      </p>
      <p>
        <strong>Official:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Official}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Official}
        </a>
      </p>
      <p>
        <strong>Work:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Job}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Job}
        </a>
      </p>
      <p>
        <strong>Busines:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Busines}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Busines}
        </a>
      </p>
      <p>
        <strong>Compliance</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Compliance}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Compliance}
        </a>
      </p>
      <p>
        <strong>Labs:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Labs}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Labs}
        </a>
      </p>
      <p>
        <strong>Grants:</strong>{" "}
        <a href={`mailto:${EXTERNAL_LINKS.Grants}`} className="text-primaryHue hover:underline">
          {EXTERNAL_LINKS.Grants}
        </a>
      </p>
      <p>
        <strong>News:</strong>{" "}
        <a href={`${EXTERNAL_LINKS.Medium}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline">
          Medium
        </a>
      </p>
      <p>
        <strong>Community:</strong>{" "}
        <a href={`${EXTERNAL_LINKS.Telegram}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Telegram
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Twitter}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Twitter
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Discord}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Discord
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Forum}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Forum
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Youtube}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          YouTube
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Reddit}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Reddit
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.ChatMe}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          ChatMe
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Coingecko}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Coingecko
        </a>{" "}
        |{" "}
        <a href={`${EXTERNAL_LINKS.Github}`} target="_blank" rel="noopener noreferrer" className="text-primaryHue hover:underline ml-1">
          Github
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
