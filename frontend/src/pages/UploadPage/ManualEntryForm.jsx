import { FileText } from 'lucide-react';

const ManualEntryForm = ({ categories, handleManualSubmit, fields }) => {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-2xl border border-slate-700 hover:shadow-cyan-500/30 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/50">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Add Receipt
          </h3>
          <p className="text-slate-400 mt-1">
            Enter your expense details below if you don't have a physical receipt
          </p>
        </div>
      </div>

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
        className="space-y-4 mt-6"
      >
        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            step={field.step}
            required={field.required}
            className="w-full p-3 rounded-lg border border-slate-600 bg-slate-800/50 placeholder-slate-400 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
          />
        ))}
        <select
          name="category"
          className="w-full p-3 rounded-lg border border-slate-600 bg-slate-800/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none cursor-pointer transition-all"
          required
        >
          <option value="" className="bg-slate-900 text-slate-400">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat} className="bg-slate-900 text-slate-100">
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ManualEntryForm;