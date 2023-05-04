import Link from "next/link";

const ButtonLink = ({ purpose, href, children, onClick }) => {
  let styleClass;
  if (purpose === "delete") {
    styleClass =
      "inline-block bg-red-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded";
  } else {
    styleClass =
      "inline-block bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  }
  return (
    <button onClick={onClick} href={href} className={styleClass}>
      {children}
    </button>
  );
};

export default ButtonLink;
