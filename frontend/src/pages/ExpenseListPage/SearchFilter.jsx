import React from "react";
import { Search } from "lucide-react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all"
        />
      </div>

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all w-full sm:w-auto cursor-pointer"
      >
        <option className="bg-slate-900">All</option>
        {categories.map((cat) => (
          <option key={cat} className="bg-slate-900">{cat}</option>
        ))}
      </select>

      {/* Date Filter Component */}
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-none transition-all w-full sm:w-auto cursor-pointer"
      />
    </div>
  );
};

export default SearchFilter;