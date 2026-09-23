import { Check } from "lucide-react";
import FormLogin from "../../components/FormLoginDash";
function Login() {
  return (
    <div className="bg-surface-base flex justify-center items-center min-h-screen py-10 ">
      <div className="md:border w-300 rounded-xl flex ">
        <div className="hidden rounded-l-xl py-25 bg-surface-elevated border border-border-subtle w-1/2 h-auto md:flex justify-center px-15 gap-8 flex-col">
          <div className="flex gap-3 items-center  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h1 className="text-text-primary font-bold text-3xl">
              E-Hub ECommerce
            </h1>
          </div>
          <h1 className="text-5xl font-bold text-text-secondary">
            Manage Your Store Like a Pro
          </h1>
          <p className="text-text-muted">
            Control products, orders, users, carts and analytics from a modern
            dashboard experience.
          </p>
          <ul className="flex flex-col gap-3 *:flex *:gap-2 *:border  *:rounded-lg *:p-3 *:bg-surface-card *:border-border-subtle">
            <li>
              <Check className="text-accent" />
              <p className="text-text-secondary">Product Management</p>
            </li>
            <li>
              <Check className="text-accent" />
              <p className="text-text-secondary">Order Tracking</p>
            </li>
            <li>
              <Check className="text-accent" />
              <p className="text-text-secondary">Customer Insights</p>
            </li>
          </ul>
        </div>
        <div className="  w-115 mx-auto  bg-surface-card border border-border-subtle md:w-1/2 py-15 rounded-xl md:rounded-l-none md:rounded-r-xl">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
