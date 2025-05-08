interface ITopicLinksProps {
  links?: { name: string; url: string }[];
}

export const TopicLinks: React.FC<ITopicLinksProps> = ({ links }) => {
  if (!links?.length) return null;
  return (
    <ul className="list-disc ml-5 space-y-1 text-sm text-orange">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline break-words"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
