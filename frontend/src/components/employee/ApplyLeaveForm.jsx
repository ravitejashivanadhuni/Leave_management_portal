import { useEffect, useState } from "react";
import api from "../../services/api";

function ApplyLeaveForm() {
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    leave_type_id: "",
    from_date: "",
    to_date: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

async function fetchLeaveTypes() {

    try {

        const res = await api.get(
            "/employee/leave-types"
        );

        setLeaveTypes(
            res.data.data
        );

    }

    catch(err){

        console.log(err);

    }

}

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post(
        "/employee/apply-leave",
        form
      );

      alert("Leave Applied Successfully");

      setForm({
        leave_type_id: "",
        from_date: "",
        to_date: "",
        reason: "",
      });

    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-8 space-y-5"
    >

      <div>

        <label className="font-medium">
          Leave Type
        </label>

        <select
          className="w-full border rounded-lg p-3 mt-2"
          value={form.leave_type_id}
          onChange={(e) =>
            setForm({
              ...form,
              leave_type_id: e.target.value,
            })
          }
        >

          <option value="">
            Select Leave Type
          </option>

          {leaveTypes.map((type) => (

            <option
              key={type.id}
              value={type.id}
            >
              {type.name}
            </option>

          ))}

        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label>From Date</label>

          <input
            type="date"
            className="w-full border rounded-lg p-3 mt-2"
            value={form.from_date}
            onChange={(e) =>
              setForm({
                ...form,
                from_date: e.target.value,
              })
            }
          />

        </div>

        <div>

          <label>To Date</label>

          <input
            type="date"
            className="w-full border rounded-lg p-3 mt-2"
            value={form.to_date}
            onChange={(e) =>
              setForm({
                ...form,
                to_date: e.target.value,
              })
            }
          />

        </div>

      </div>

      <div>

        <label>Reason</label>

        <textarea
          rows="5"
          className="w-full border rounded-lg p-3 mt-2"
          value={form.reason}
          onChange={(e) =>
            setForm({
              ...form,
              reason: e.target.value,
            })
          }
        />

      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Apply Leave
      </button>

    </form>
  );
}

export default ApplyLeaveForm;