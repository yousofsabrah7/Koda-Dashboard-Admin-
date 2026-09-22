import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

function Sidebar({ showSidebar, setShowSidebar }) {
  return (
    <div className="sidebar-nav">
      <div
        className={`sidebar pt-[23px] pb-[24px] pl-[25px] w-[285px] transition duration-300 ease-linear h-screen bg-surface-card text-text-primary border-r border-border-subtle fixed top-0 left-0 z-50 overflow-auto flex flex-col ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <div className="mb-2">
            <h4 className="tracking-[2px] text-accent mb-[3px] font-mono text-xs uppercase font-bold">
              {" "}
              E-Commerce{" "}
            </h4>
            <h3 className="font-display font-bold text-text-primary text-lg">
              {" "}
              Admin Panel{" "}
            </h3>
          </div>
          <div>
            <button
              className="p-1.5 lg:hidden border rounded-lg mr-2 text-secondary hover:text-text-primary cursor-pointer"
              onClick={() => {
                setShowSidebar(false);
              }}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>

        <nav className="w-[90%] py-[2px]">
          <ul className="list-none mt-[5px] mb-[5px] space-y-1">
            <li className="mt-[2px] h-[48px] rounded-[15px] flex items-center text-[16px] transition duration-200 hover:bg-white/20">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <FiHome className="text-[18px] mr-[6px]" />
                Dashboard
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <LuUsers className="text-[18px] mr-[6px]" />
                Users
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <AiFillProduct className="text-[18px] mr-[6px]" />
                Products
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/product/new"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <IoIosAdd className="text-[18px] mr-[6px]" />
                Add Product
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <FaRegFileAlt className="text-[18px] mr-[6px]" />
                Orders
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <IoCartOutline className="text-[18px] mr-[6px]" />
                Wishlist
              </NavLink>
            </li>

            <li className="mt-[2px] h-[48px] rounded-[15px] mb-[2px] flex items-center text-[16px] transition duration-200">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-accent-light text-accent text-[17px] border border-accent/20 font-semibold"
                    : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition duration-200"
                }
              >
                <IoMdSettings className="text-[18px] mr-[6px]" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto w-[95%] rounded-[25px] bg-surface-elevated border border-border-subtle py-5 pl-3 pr-5 text-text-secondary text-[20px]">
          <h4 className="text-[15px] tracking-[2px] text-emerald-500 font-bold">
            {""}
            Live {""}
          </h4>
          <p className="text-text-muted text-sm mt-1">
            Connected to the E-commerce API
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
