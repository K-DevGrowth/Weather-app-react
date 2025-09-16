const Navbar = () => {
  return (
    <header className="p-4 flex items-center justify-between">
      <img className="block max-w-full" src="./logo.svg" alt="" />
      <button type="button" className="flex items-center gap-2 rounded-md px-2 py-1 bg-Neutral-800">
        <img src="./icon-units.svg" alt="" />
        <span>Units</span>
        <img src="./icon-dropdown.svg" alt="" />
      </button>
    </header>
  );
};

export default Navbar;
