// App.jsx 
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotificationsPanel from './components/NotificationsPanel'
import { db, auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue, push, set, remove } from 'firebase/database'

import IntroPage from './pages/IntroPage/IntroPage'
import UploadPage from './pages/UploadPage/UploadPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import BudgetPage from './pages/BudgetPage/BudgetPage'
import ExpenseListPage from './pages/ExpenseListPage/ExpenseListPage'
import AuthPage from './pages/AuthPage/AuthPage'
import './App.css'

export const CATEGORIES = [
  'Food','Beverages','Grocery','Electronics','Clothing',
  'Entertainment','Utilities','Transport','Other',
]

export const COLORS = [
  '#FF6B6B','#4ECDC4','#45B7D1','#FFA07A',
  '#98D8C8','#FFD93D','#6A67CE','#FF8C00','#1E90FF'
]

const App = () => {
  const [userId, setUserId] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [expenses, setExpenses] = useState([])
  const [budgets, setBudgets] = useState({
    Food:{monthly:500,weekly:125},Beverages:{monthly:150,weekly:37.5},
    Grocery:{monthly:400,weekly:100},Electronics:{monthly:300,weekly:75},
    Clothing:{monthly:250,weekly:62.5},Entertainment:{monthly:200,weekly:50},
    Utilities:{monthly:350,weekly:87.5},Transport:{monthly:200,weekly:50},
    Other:{monthly:100,weekly:25},
  })

  const location = useLocation()

  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  // --- Auth Listener ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(user)=>{
      setUserId(user ? user.uid : null)
      setLoadingAuth(false)
    })
    return unsub
  },[])

  // --- Expenses listener ---
  useEffect(()=>{
    if(!userId) return
    const r = ref(db,`expenses/${userId}`)
    return onValue(r,s=>{
      const d=s.val(); if(!d) return setExpenses([])
      setExpenses(Object.entries(d).map(([k,v])=>({id:k,...v})))
    })
  },[userId])

  // --- Budgets listener ---
  useEffect(()=>{
    if(!userId) return
    const r = ref(db,`budgets/${userId}`)
    return onValue(r,s=>{
      const d=s.val(); if(d) setBudgets(d)
    })
  },[userId])

  // --- Notifications listener ---
  useEffect(()=>{
    if(!userId) return
    const r = ref(db,`notifications/${userId}`)
    return onValue(r,s=>{
      const d=s.val(); if(!d) return setNotifications([])
      setNotifications(
        Object.entries(d).map(([key, value]) => ({
          firebaseId: key,   
          ...value          
        }))
      )
    })
  },[userId])

  // --- Helpers ---
  const addExpense = async (expense)=>{
    if(!userId) return setExpenses(p=>[...p,expense])
    await set(push(ref(db,`expenses/${userId}`)),expense)
  }

  const addNotification = async (notif)=>{
    if(!userId) return setNotifications(p=>[...p,notif])
    await set(push(ref(db,`notifications/${userId}`)),notif)
  }

  const removeNotification = async (id) => {
    if (!userId) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      return;
    }
    try {
      await remove(ref(db, `notifications/${userId}/${id}`));
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to remove notification:", err);
    }
  };
  const clearAllNotifications = async () => {
    if (!userId) {
      setNotifications([]);
      return;
    }

    try {
      await remove(ref(db, `notifications/${userId}`));
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };



  const Protected = ()=> {
    if(loadingAuth) return null
    if(!userId) return <Navigate to="/" replace/>
    return <Outlet/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      {showAuth && (
        <AuthPage authMode={authMode} setAuthMode={setAuthMode} setShowAuth={setShowAuth}/>
      )}

      {userId && location.pathname !== "/" && (
        <>
          <Navbar
            notifications={notifications}
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
          />
          {showNotifications && (
            <NotificationsPanel
              userId={userId}
              notifications={notifications}
              setNotifications={setNotifications}
              onClose={()=>setShowNotifications(false)}
              removeNotification={removeNotification}
              clearAllNotifications={clearAllNotifications}
            />
          )}
        </>
      )}
      <Routes>
        <Route path="/" element={<IntroPage setShowAuth={setShowAuth} setAuthMode={setAuthMode}/>}/>
        <Route element={<Protected/>}>
          <Route
            element= {
              <div className='max-w-7xl mx-auto px-6 py-12'>
                <Outlet/>
              </div>
            }
          
          >
            <Route 
              path="/dashboard" 
              element={
                <DashboardPage 
                  expenses={expenses} 
                  budgets={budgets} 
                  categories={CATEGORIES} 
                  COLORS={COLORS}
                />
              }
            />
            <Route 
              path="/upload" 
              element={
                <UploadPage 
                  userId={userId} 
                  addExpenses={addExpense} 
                  addNotifications={addNotification} 
                  categories={CATEGORIES} 
                  budgets={budgets} 
                  expenses={expenses}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  isSuccess={isSuccess}
                  setIsSuccess={setIsSuccess}
                />
              }
            />
            <Route 
              path="/budget" 
              element={
                <BudgetPage 
                  budgets={budgets} 
                  setBudgets={setBudgets} 
                  categories={CATEGORIES} 
                  userId={userId} 
                  addNotifications={addNotification}
                />
              }
            />
            <Route 
              path="/expenses" 
              element={
                <ExpenseListPage 
                  userId={userId} 
                  expenses={expenses} 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                  filterCategory={filterCategory} 
                  setFilterCategory={setFilterCategory} 
                  categories={CATEGORIES} 
                  COLORS={COLORS} 
                  addNotifications={addNotification}
                />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  )
}

export default App
