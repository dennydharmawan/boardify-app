import { useState } from 'react';

import { useCurrentUser } from '@/modules/users/api/getUsers';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // TODO give proper type for user
  const { data: currentUser, isLoading } = useCurrentUser();

  const redirectToGoogleSSO = async () => {
    const googleLoginUrl = 'http://localhost:3001/api/auth/google';
    const newWindow = window.open(googleLoginUrl, '_blank', 'width=500, height=600');
  };

  if (isLoading) return null;

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  // const handleLogout = () => {
  //   axios
  //     .get('http://localhost:3001/api/logout')
  //     .then(() => setUser(null))
  //     .catch((error) => console.error(error));
  // };

  return (
    <header className={`flex w-full items-center bg-white dark:bg-dark`}>
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
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
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

            {!currentUser ? (
              <>
                <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                  <button
                    // href="/#"
                    className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
                    onClick={redirectToGoogleSSO}
                  >
                    Sign in with Gmail
                  </button>

                  <a
                    href="/#"
                    className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
                  >
                    Use Boardify for free
                  </a>
                </div>
              </>
            ) : (
              <>{currentUser.fullName}</>
            )}
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
          className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
