import { useEffect, useState } from 'react';

import { axios } from '@/lib/axios';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // TODO give proper type for user
  const [user, setUser] = useState<any>();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/user')
      .then((response) => setUser(response.data.user))
      .catch((error) => console.error(error));
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:3001/api/logout')
      .then(() => setUser(null))
      .catch((error) => console.error(error));
  };

  return (
    <header className={`dark:bg-dark flex w-full items-center bg-white`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full">
              <h1 className="text-3xl font-bold">Boardify</h1>
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && 'navbarTogglerActive'
                } absolute right-4 top-1/2 block rounded-lg px-3 py-[6px] ring-primary -translate-y-1/2 focus:ring-2 lg:hidden`}
              >
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`dark:bg-dark-2 absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && 'hidden'
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/#">Payment</ListItem>
                  <ListItem NavLink="/#">About</ListItem>
                  <ListItem NavLink="/#">Blog</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a
                href="/#"
                className="text-dark px-7 py-3 text-base font-medium hover:text-primary dark:text-white"
                onClick={handleLogin}
                target="_blank"
              >
                Sign in with Gmail
              </a>

              <a
                href="/#"
                className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
              >
                Use Boardify for free
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }: { children: React.ReactNode; NavLink: string }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="text-body-color hover:text-dark dark:text-dark-6 flex py-2 text-base font-medium dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
