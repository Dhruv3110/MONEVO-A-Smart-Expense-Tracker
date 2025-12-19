import { Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import DragAndDropUpload from './DragAndDropUpload';
import CameraUpload from './CameraUpload';
import ManualEntryForm from './ManualEntryForm';
import { db } from '../../firebaseConfig';
import { ref, push, set } from 'firebase/database';

const UploadPage = ({ 
  userId,
  addNotifications, 
  categories, 
  budgets, 
  expenses,
  isUploading,
  setIsUploading,
  isSuccess,
  setIsSuccess
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);


  const fields = [
    {
      type: "text",
      name: "name",
      placeholder: "Item Name",
      required: true,
    },
    {
      type: "number",
      name: "price",
      placeholder: "Amount",
      step: "1",
      required: true,
    },
    {
      type: "date",
      name: "date",
      placeholder: "Select Date",
      required: false,
    }, 
  ]

  const checkBudgetLimit = (category, budgets, expenses, addNotifications) => {
    const totalSpent = expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

    const monthlyBudget = budgets[category]?.monthly || 0;
    const weeklyBudget = budgets[category]?.weekly || 0;

    if(totalSpent > weeklyBudget) {
      const over = totalSpent - weeklyBudget;
      addNotifications({
        id: Date.now(),
        type: "warning",
        message: `Caution! You've exceeded your weekly budget for ${category} by ₹${over.toFixed(2)}!`,
      });
    }

    if(totalSpent > monthlyBudget) {
      const over = totalSpent - monthlyBudget;
      addNotifications({
        id: Date.now(),
        type: "warning",
        message: `Alert! You've exceeded your monthly budget for ${category} by ₹${over.toFixed(2)}!`,
      });
    }
  }

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setIsSuccess(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/expenses/upload", { method: "POST", body: formData, });
      const data = await res.json();
      const expenseRef = ref(db, `expenses/${userId}`);

      data.items.forEach((item) => {
        const newRef = push(expenseRef);
        const key = newRef.key;

        const newExpense = {
          id: key,
          category: item.category,
          amount: item.price,
          date: new Date().toISOString().split("T")[0],
          description: item.name,
        };
        set(newRef, newExpense);
        checkBudgetLimit(item.category, budgets, [...expenses, newExpense], addNotifications);
      });

      addNotifications({
        id: Date.now(),
        type: "success",
        message: `Receipt processed! Added ${data.items.length} new expenses.`,
      });
      setIsUploading(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      setIsUploading(false);
      setIsSuccess(false);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Error processing receipt. Please try again.",
      });
      console.error("Upload failed:", err);
    }
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleManualSubmit = (manualData) => {
    try {
      const expenseRef = ref(db, `expenses/${userId}`);
      manualData.items.forEach((item) => {
        const newRef = push(expenseRef);
        const key = newRef.key;

        const newExpense = {
          id: key,
          category: item.category,
          amount: item.price,
          date: item.date || new Date().toISOString().split("T")[0],
          description: item.name,
        };

        set(newRef, newExpense);
        checkBudgetLimit(item.category, budgets, [...expenses, newExpense], addNotifications);
      });

      addNotifications({
        id: Date.now(),
        type: "success",
        message: `Manual entry added! Added ${manualData.items.length} new expense(s).`,
      });
    } catch (err) {
      console.error("Manual entry failed:", err);
      addNotifications({
        id: Date.now(),
        type: "error",
        message: "Error adding manual entry. Please try again.",
      });
    }
  };

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 flex items-center gap-3">
        <Upload className="text-cyan-400" />
        Upload Receipt
      </h2>

      <DragAndDropUpload
        handleFileUpload={handleFileUpload}
        isUploading={isUploading}
        isSuccess={isSuccess}
        setIsDragging={setIsDragging}
        isDragging={isDragging}
        handleDrop={handleDrop}
      />

      {/* Camera Upload (visible only on mobile) */}
      {isMobile && (
        <CameraUpload handleFileUpload={handleFileUpload}/>
      )}

      {/* Manual Entry Form */}
      <ManualEntryForm 
        categories={categories}
        handleManualSubmit={handleManualSubmit}
        fields={fields}
      />
    </div>
  );
};

export default UploadPage;
