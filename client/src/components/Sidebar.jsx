import { links } from "../constants";
import { NavLink } from "react-router-dom";

//On small screens max width 80px, on medium screens and up: max width 150px
const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen justify-between items-center md:px-3 py-3 max-md:gap-20 max-md:justify-normal">
      <img
        src="/r_logo.jpg"
        alt="logo"
        className="max-w-[80px] md:max-w-[150px]"
      />

      <nav className="flex flex-col gap-20">
        {links.map((i, key) => (
          <NavLink key={key}  
                   to={i.path} 
                   className="flex gap-4 items-center text-lg text-gray-400">
            <span className="max-md:text-2xl">{i.icon}</span>
            <span className="max-md:hidden">{i.title}</span>
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold">🍽 Tip of the Day</p>
        <button className="bg-orange-500 p-2 rounded-lg hover:bg-orange-600 text-white">Subscribe</button>
      </div>
    </aside>
  );
};

export default Sidebar;
