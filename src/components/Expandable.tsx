import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}
const Expandable = ({ children, maxChars = 100 }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  if (children.length <= maxChars) return <p>{children}</p>;
  const text = isExpanded
    ? children
    : children.substring(0, maxChars) + "...";
  return (
    <p>
      {text}
      <a
        onClick={() => setExpanded(!isExpanded)}
        className="text-decoration-underline ms-3"
        role="button"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </a>
    </p>
  );
};
export default Expandable;
