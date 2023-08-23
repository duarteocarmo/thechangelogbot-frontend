import Image from "next/image";

function Header() {
    return (
        <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
            <div>
                <a href="/">
                    <Image
                        src="https://raw.githubusercontent.com/thechangelog/changelog.com/master/assets/static/images/brand/changelog-mark-dark.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                </a>
            </div>
            <div></div>
            <div></div>
        </div>
    );
}


export default Header