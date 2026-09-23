import ThemeToggle from "../ThemeToggle";
import { PiBellRingingLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/services/authSlice";
import { useLogout } from "../../services/apiHooks/authHook";

function Navbar({ isDark, setIsDark, showSidebar, setShowSidebar }) {
  const logoutMutation = useLogout();
  const user = useSelector(selectUser);
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div>
      <div className="lg:pl-[320px] w-full h-[80px] fixed top-0 z-40 pt-0 pb-0 pr-[30px] border-b border-border-subtle bg-surface-card/90 text-text-primary backdrop-blur-md flex justify-between items-center pl-[10px]  transition-colors">
        <div className="flex items-center gap-[15px]">
          <button
            className="lg:hidden items-center justify-center rounded-[15px] border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-3 py-[9px] text-[20px] cursor-pointer ml-[10px] transition"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <CiMenuBurger />
          </button>

          <div className="max-[620px]:hidden">
            <h4 className="text-[17px] font-display font-semibold text-text-primary">
              E-Hub Dashboard
            </h4>
            <h5 className="text-[11px] mt-1 font-mono text-text-muted">
              E-Commerce Admin Panel
            </h5>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

          <button className="flex items-center justify-center cursor-pointer rounded-[15px] border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-4 py-3 text-[20px] transition">
            <PiBellRingingLight />
          </button>
          <div className="rounded-[15px] max-[720px]:hidden border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-4 py-1.5 text-[20px]">
            <p className="font-semibold text-sm text-accent">
              {user?.username}
            </p>
            <p className=" text-xs text-center text-secondary"> {user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`rounded-[15px] border border-rose-500/20 bg-rose-600 text-white transition duration-500 hover:bg-rose-700 ${logoutMutation.isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {logoutMutation.isPending ? (
              <div className="flex items-center gap-1 px-[22px] py-[10px]">
                <span
                  className={`size-6 block  rounded-full border-4 border-white border-r-transparent ${logoutMutation.isPending ? "animate-spin" : ""}`}
                ></span>
                <h4 className="-translate-y-0.5">Logout</h4>
              </div>
            ) : (
              <div className="flex items-center group w-full  overflow-hidden px-[22px] py-[10px]">
                <IoIosLogOut className="text-[20px] text-white mr-1" />
                <h4 className="w-0 invisible group-hover:w-13 group-hover:visible duration-300 ease-linear -translate-y-0.5">
                  Logout
                </h4>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
