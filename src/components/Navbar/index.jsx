import { BsFillPersonBadgeFill } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { CgMenu } from "react-icons/cg";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const navigation = [
  { name: "Students", href: "/", current: true },
  { name: "Classes", href: "/class", current: false },
  { name: "Rooms", href: "/room", current: false },
  { name: "Teachers", href: "/teacher", current: false },
  { name: "Lessons", href: "/lesson", current: false },
  { name: "Attendance", href: "/attendence", current: false },
  { name: "Report", href: "/report", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default () => {
  const { totalItems } = useCart();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <SlClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <CgMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto text-white"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* shopp app */}
              {/* <div className="absolute inset-y-0 right-0 flex items-center pr-10 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 pr-8  text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <Link to={"/cart"}>
                    <HiOutlineShoppingCart size={30} />
                    <span className="absolute -top-2 right-3 bg-gray-500 rounded-full w-7 h-7 flex justify-center items-center font-bold">
                      {totalItems}
                    </span>
                  </Link>
                </button>
              </div> */}
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <BsFillPersonBadgeFill size={30} />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
