import Link from "next/link";

function Footer() {
  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-gray-500 mt-14">
      <label className="mb-2 text-gray-900 pr-3 text-sm">
        By{" "}
        <a href="https://duarteocarmo.com" target="_blank">
          Duarte O.Carmo
        </a>{" "}
        | Powered by{" "}
        <a
          href="https://www.superduperdb.com/?ref=changelog"
          className="text-superduper-purple font-bold"
          target="_blank"
        >
          SuperDuperDB
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/duarteocarmo/thechangelogbot-frontend"
          target="_blank"
        >
          GitHub
        </a>
      </label>
    </div>
  );
}

export default Footer;
