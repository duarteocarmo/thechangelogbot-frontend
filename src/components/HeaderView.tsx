import Image from "next/image";

function Header() {
    return (
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/">
                <Image
                    src="https://raw.githubusercontent.com/thechangelog/changelog.com/master/assets/static/images/brand/changelog-mark-dark.svg"
                    width={30}
                    height={30}
                    alt="logo"
                />
            </a>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 hover:text-gray-900">First Link</a>
                <a className="mr-5 hover:text-gray-900">Second Link</a>
            </nav>
        </div>
    );
}

export default Header;
