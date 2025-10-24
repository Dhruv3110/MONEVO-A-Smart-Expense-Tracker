import React, { useEffect, useRef, useState } from "react";
import { Bell, X, AlertTriangle, CheckCircle } from "lucide-react";
import { db } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

const NotificationsPanel = ({ 
  userId, 
  notifications, 
  setNotifications, 
  onClose,
  removeNotification
}) => {
  const panelRef = useRef(null);
  const timerRef = useRef(null);

  // ✅ Close panel function
  const handleClosePanel = (deleteNotifications = false) => {
    if (deleteNotifications && userId) {
      remove(ref(db, `notifications/${userId}`)).catch(console.error);
      setNotifications([]);
    }
    onClose();
  };

  // ✅ Auto close & outside click — WITHOUT deleting
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => handleClosePanel(false), 10000);
    };

    resetTimer();

    const panel = panelRef.current;
    if (panel) {
      panel.addEventListener("mousemove", resetTimer);
      panel.addEventListener("scroll", resetTimer);
    }

    const handleClickOutside = (e) => {
      if (panel && !panel.contains(e.target)) {
        handleClosePanel(false); // ✅ just close, DO NOT delete
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timerRef.current);
      if (panel) {
        panel.removeEventListener("mousemove", resetTimer);
        panel.removeEventListener("scroll", resetTimer);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId]);

  return (
    <div
      ref={panelRef}
      className="fixed top-20 right-4 w-[90%] max-w-md sm:w-96 bg-white rounded-xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto animate-slide-in-right border border-gray-200"
    >
      <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg">Notifications & Insights</h3>
        <button
          onClick={() => handleClosePanel(false)} // ✅ delete only on X
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`relative p-4 rounded-lg text-sm sm:text-base transition-all duration-300 ${
                notif.type === "warning"
                  ? "bg-yellow-50 border-l-4 border-yellow-500"
                  : notif.type === "alert"
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-green-50 border-l-4 border-green-500"
              } animate-fade-in`}
            >
              <button
                className="absolute top-4 right-2 p-1 rounded "
                onClick={() => removeNotification(notif.firebaseId)}
              >
                <X size={16} className="text-gray-600" />
              </button>
              <div className="flex items-start gap-3">
                {notif.type === "alert" ? (
                  <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                ) : notif.type === "warning" ? (
                  <Bell className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                ) : (
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                )}

                <div className="flex-1">
                  <p className="text-gray-700">{notif.message}</p>
                  {notif.time && <p className="text-xs text-gray-400 mt-1">{notif.time}</p>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6 text-sm">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
