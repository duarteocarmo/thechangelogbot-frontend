import Link from "next/link";

function Footer() {
  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-gray-500 mt-14">
      <label className="mb-2 text-gray-900 pr-3">
        Powered by{" "}
        <a
          href="https://www.superduperdb.com/?ref=changelog"
          className="text-superduper-purple font-bold"
          target="_blank"
        >
          SuperDuperDB
        </a>
      </label>
    </div>
  );
}

export default Footer;
