const Footer = () => {
  return (
    <footer
      style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      className="m-5 bg-white rounded-lg shadow flex items-center justify-between p-6 dark:bg-gray-800"
    >
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022
        <a href="https://github.com/Shodydosh"> Shodydosh™</a>. All Rights
        Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        {/* <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li> */}
      </ul>
    </footer>
  );
};

export default Footer;
