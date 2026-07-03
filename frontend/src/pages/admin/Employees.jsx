import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import Card from "../../components/ui/Card";
import { getEmployees } from "../../services/adminService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEmployees(filtered);
  }, [search, employees]);

  async function loadEmployees() {
    try {
      const res = await getEmployees();

      setEmployees(res.data.data);
      setFilteredEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="text-center mt-10">Loading Employees...</h2>;
  }

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Employees
        </h1>

        <p className="text-gray-500">
          View and manage all employees.
        </p>
      </div>

      {/* Search */}

      <Card className="p-4">

        <div className="relative max-w-md">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </Card>

      {/* Table */}

      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Department</th>

              <th className="text-left p-4">Designation</th>

              <th className="text-left p-4">Joined On</th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.length > 0 ? (

              filteredEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    {employee.designation}
                  </td>

                  <td className="p-4">
                    {employee.joinedOn}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No employees found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </Card>

    </div>
  );
}

export default Employees;