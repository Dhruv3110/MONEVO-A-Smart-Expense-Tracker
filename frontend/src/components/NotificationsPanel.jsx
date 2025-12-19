import { useEffect, useRef } from "react";
import { Bell, X, AlertTriangle, CheckCircle } from "lucide-react";

const NotificationsPanel = ({ 
  userId, 
  notifications, 
  onClose,
  removeNotification,
  clearAllNotifications
}) => {
  const panelRef = useRef(null);
  const timerRef = useRef(null);

  // Auto close & outside click — WITHOUT deleting
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onClose(), 10000);
    };

    resetTimer();

    const panel = panelRef.current;
    if (panel) {
      panel.addEventListener("mousemove", resetTimer);
      panel.addEventListener("scroll", resetTimer);
    }

    const handleClickOutside = (e) => {
      if (panel && !panel.contains(e.target)) {
        onClose();
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
      className="fixed top-20 right-4 w-[90%] max-w-md sm:w-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl border border-slate-700 z-50 max-h-[70vh] overflow-y-auto animate-slide-in-right"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 z-10 backdrop-blur-sm">
        <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-base sm:text-lg">
          Notifications & Insights
        </h3>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-xs sm:text-sm font-medium text-red-400 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-400 active:scale-95 transition-all duration-200"
            >
              Clear All
            </button>
          )}

          <button
            onClick={() => onClose()}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`relative p-4 rounded-lg text-sm sm:text-base transition-all duration-300 border backdrop-blur-sm ${
                notif.type === "warning"
                  ? "bg-yellow-500/10 border-l-4 border-yellow-500 hover:bg-yellow-500/20"
                  : notif.type === "alert"
                  ? "bg-red-500/10 border-l-4 border-red-500 hover:bg-red-500/20"
                  : "bg-green-500/10 border-l-4 border-green-500 hover:bg-green-500/20"
              } animate-fade-in shadow-lg`}
            >
              <button
                className="absolute top-4 right-2 p-1 rounded hover:bg-slate-700/50 transition-colors"
                onClick={() => removeNotification(notif.firebaseId)}
              >
                <X size={16} className="text-slate-400 hover:text-slate-200" />
              </button>
              
              <div className="flex items-start gap-3 pr-6">
                {notif.type === "alert" ? (
                  <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                    <AlertTriangle className="text-red-400 flex-shrink-0" size={20} />
                  </div>
                ) : notif.type === "warning" ? (
                  <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                    <Bell className="text-yellow-400 flex-shrink-0" size={20} />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-slate-100 leading-relaxed">{notif.message}</p>
                  {notif.time && (
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                      {notif.time}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Bell className="text-slate-500" size={28} />
            </div>
            <p className="text-slate-400 text-sm">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;