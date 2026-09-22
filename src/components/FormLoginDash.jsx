import { LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin, useProfile } from "../services/apiHooks/authHook";
import { useState } from "react";

function FormLogin() {
  const [email1, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { mutateAsync, isPending, isSuccess, isError, error, data } =
    useLogin();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email1.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email1)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password1) {
      newErrors.password = "Password is required";
    } else if (password1.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = email1.trim();
    const password = password1.trim();
    if (!validate()) return;
    try {
      const response = await mutateAsync({
        email,
        password,
      });
      if (response?.user?.role === "admin") {
        navigate("/");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col gap-4  w-full h-full px-10 ">
      <div className="flex justify-center flex-col items-center gap-3">
        <img
          src="https://koda-store-dashboard.vercel.app/assets/KodaLogo2-D3eRgjLV.png"
          width={200}
          className=""
        />
        <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
        <p
          className={`text-sm transition duration-300 ease-linear ${isError ? "text-red-400" : isSuccess ? (data.user.role === "admin" ? "text-emerald-500" : "text-red-400") : "text-text-muted"}`}
        >
          {isError
            ? error.message
            : isSuccess
              ? data.user.role === "admin"
                ? "Login successfully"
                : "User not has access to dashboard"
              : "Sign in to your admin dashboard"}
        </p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1 relative justify-center">
            <Mail
              width={22}
              height={20}
              className="absolute top-11 left-3 text-text-muted"
            />
            <label className="text-text-secondary">Email Address</label>
            <input
              value={email1}
              disabled={isPending}
              type="text"
              className="px-10 py-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
              placeholder="Enter your Email"
              onChange={(e) => {
                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                setEmail(e.target.value);
              }}
            />
          </div>
          {errors.email ? (
            <span className="text-red-400/90 text-md">{errors.email}</span>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 relative">
            <LockKeyhole
              width={27}
              height={20}
              className="absolute top-12 left-2 text-text-muted "
            />
            <label className="text-text-secondary">Password</label>

            <input
              disabled={isPending}
              value={password1}
              type="password"
              onChange={(e) => {
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
                setPassword(e.target.value);
              }}
              className="px-10 py-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
              placeholder="Enter your Password"
            />
            <span className="text-red-400/90 text-md">
              {errors.password ? errors.password : ""}
            </span>
          </div>
          <button
            type="submit"
            disabled={isPending ? true : isSuccess}
            className="bg-accent hover:bg-accent-hover disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 rounded-lg text-text-primary font-semibold text-md cursor-pointer flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>
      <div className="flex gap-4 items-center *:text-white/60 *:text-sm">
        <div className="h-px flex-1 bg-gray-400" />
        <p className="text-sm text-gray-500">OR</p>
        <div className="h-px flex-1 bg-gray-400" />{" "}
      </div>
      <div>
        <button className="flex gap-2 border justify-center items-center cursor-pointer bg-surface-card border-border-subtle  bg- w-full p-3 rounded-lg text-text-primary hover:bg-surface-elevated transition font-bold">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="h-5 w-5"
          ></img>
          Continuo with Google
        </button>
      </div>
      <p className="text-center text-text-secondary">Secure Admin Access</p>
    </div>
  );
}

export default FormLogin;
