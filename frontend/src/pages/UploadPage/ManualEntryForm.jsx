
import { FileText } from 'lucide-react';
const ManualEntryForm = ({ categories, handleManualSubmit, fields }) => {
  return (
    <div className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-10 h-10 text-white" />
        <h3 className="text-2xl font-bold">Add Receipt</h3>
      </div>
      <p className="mb-6 text-purple-100">
        Enter your expense details below if you don’t have a physical receipt.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const item = {
            name: form.name.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            date: form.date.value || new Date().toISOString().split("T")[0], // use today's date if not provided
          };
          handleManualSubmit({ items: [item] });
          form.reset();
        }}
        className="space-y-4"
      >
        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            step={field.step}
            required={field.required}
            className="w-full p-3 rounded-lg border border-white bg-transparent bg-opacity-20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        ))}
        <select
          name="category"
          className="w-full p-3 rounded-lg border border-white bg-transparent bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-white appearance-none"
          required
        >
          <option value="" className="bg-gray-900 text-white">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat} className="bg-gray-900 text-white">
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ManualEntryForm;