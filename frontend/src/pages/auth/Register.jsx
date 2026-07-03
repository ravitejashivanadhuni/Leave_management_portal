import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Building2,
  Briefcase,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.department ||
      !form.designation
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser(form);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">

      <Card className="w-full max-w-xl">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-blue-600">
            Employee Leave Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Create your employee account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            icon={<User size={18} />}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            icon={<Mail size={18} />}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            icon={<Lock size={18} />}
          />

          <Input
            label="Department"
            name="department"
            placeholder="Eg. IT"
            value={form.department}
            onChange={handleChange}
            icon={<Building2 size={18} />}
          />

          <Input
            label="Designation"
            name="designation"
            placeholder="Eg. Software Engineer"
            value={form.designation}
            onChange={handleChange}
            icon={<Briefcase size={18} />}
          />

          <Button
            type="submit"
            loading={loading}
            variant="primary"
            fullWidth
          >
            Register
          </Button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </div>

      </Card>

    </div>
  );
}

export default Register;