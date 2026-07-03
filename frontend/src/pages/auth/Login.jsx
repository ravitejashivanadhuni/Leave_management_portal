import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/employee/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);

      login(
        res.data.token,
        res.data.user
      );

      if (res.data.user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/employee/dashboard", { replace: true });
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200">
            <Sparkles size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight mt-4">
            Leave Portal
          </h1>
        </div>

        <Card className="w-full p-8 border border-slate-200">
          <div className="mb-7">
            <h2 className="text-lg font-semibold text-slate-900">
              Sign in to your account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your details to access the dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              icon={<Lock size={18} />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              fullWidth
            >
              Login
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Register
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-6">
          Protected access for employees and administrators
        </p>
      </div>
    </div>
  );
}

export default Login;