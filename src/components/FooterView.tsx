import Link from "next/link";

function Footer() {
  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center mt-14 text-sm text-gray-600">
      <div className="text-center">
        By{" "}
        <a
          href="https://duarteocarmo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Duarte O.Carmo
        </a>{" "}
        | Powered by{" "}
        <a
          href="https://www.superduperdb.com/?ref=changelog"
          className="text-superduper-purple font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          SuperDuperDB
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/duarteocarmo/thechangelogbot-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Footer;
