import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddService = () => {
  const { addService } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    img: "",
    icon: "FaPlane",
    color: "bg-green-100 text-green-600",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addService(form);

    setForm({
      title: "",
      desc: "",
      img: "",
      icon: "FaPlane",
      color: "bg-green-100 text-green-600",
    });
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl mb-6 font-bold">Add Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          type="text"
          placeholder="Service Title"
          className="border p-3 w-full rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          className="border p-3 w-full rounded"
          value={form.desc}
          onChange={(e) =>
            setForm({ ...form, desc: e.target.value })
          }
        />

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL"
          className="border p-3 w-full rounded"
          value={form.img}
          onChange={(e) =>
            setForm({ ...form, img: e.target.value })
          }
        />

        {/* ICON SELECT */}
        <select
          className="border p-3 w-full rounded"
          value={form.icon}
          onChange={(e) =>
            setForm({ ...form, icon: e.target.value })
          }
        >
          <option value="FaPlane">Air-Ticket</option>
          <option value="FaPassport">Visa</option>
          <option value="FaBuilding">Investor</option>
          <option value="FaBriefcase">Business</option>
          <option value="FaFileAlt">General</option>
        </select>

        {/* COLOR SELECT */}
        <select
          className="border p-3 w-full rounded"
          value={form.color}
          onChange={(e) =>
            setForm({ ...form, color: e.target.value })
          }
        >
          <option value="bg-green-100 text-green-600">Green</option>
          <option value="bg-blue-100 text-blue-600">Blue</option>
          <option value="bg-yellow-100 text-yellow-600">Yellow</option>
          <option value="bg-purple-100 text-purple-600">Purple</option>
          <option value="bg-orange-100 text-orange-500">Orange</option>
        </select>

        {/* BUTTON */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded w-full">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
