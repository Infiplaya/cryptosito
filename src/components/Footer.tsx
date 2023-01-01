export function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800 mt-10">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <a href="https://cryptosito.vercel.app/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Cryptosito
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a href="https://www.coingecko.com/pl/api" className="hover:underline">
                  Coingecko
                </a>
              </li>
              <li className="mb-4">
                <a href="https://tailwindcss.com/" className="hover:underline">
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a href="https://beta.nextjs.org/docs" className="hover:underline">
                  Next13
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="https://github.com/Infiplaya"
                  className="hover:underline "
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://psoban.vercel.app/"
                  className="hover:underline"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://cryptosito.vercel.app/" className="hover:underline">
            Cryptosito
          </a>
          . No Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0"></div>
      </div>
    </footer>
  );
}
