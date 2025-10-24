import { Sparkles, Upload, TrendingUp, Bell, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import WorkingSection from "./WorkingSection";
import CTASection from "./CTASection";
import CreatorSection from "./CreatorSection";
  // Pages Components
const IntroPage = ({
  setShowAuth,
  setAuthMode
}) => {
  const navigate = useNavigate();
  const icons = [
    {
      icon: <Upload className="w-12 h-12" />,
      title: 'Instant Upload',
      desc: 'Drag, drop, or snap photos of receipts. Our AI extracts data automatically in seconds.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Visual Analytics',
      desc: 'Beautiful charts and graphs that turn your spending data into actionable insights.',
      color: 'from-pink-500 to-orange-500'
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: 'Smart Alerts',
      desc: 'Real-time notifications when you approach budget limits or spending anomalies detected.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: 'Budget Control',
      desc: 'Set flexible weekly and monthly budgets with automatic tracking.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const steps = [
    { step: '01', title: 'Upload Receipt', desc: 'Simply snap a photo or upload your receipt. Our AI reads and categorizes it instantly.' },
    { step: '02', title: 'Track Spending', desc: 'View real-time analytics with beautiful charts showing where your money goes.' },
    { step: '03', title: 'Get Insights', desc: 'Receive alerts to optimize your spending habits.' },
    { step: '04', title: 'Save More', desc: 'Achieve your financial goals with data-driven budgeting.' }
  ]
  
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection
        setShowAuth={setShowAuth}
        setAuthMode={setAuthMode}
      />
      
      {/* Features Section */}
      <FeatureSection icons = {icons}/>
      
      {/* How It Works */}
      <WorkingSection steps={steps} />
      
      {/* CTA Section */}
      <CTASection 
        setAuthMode={setAuthMode}
        setShowAuth={setShowAuth}
      />
      <CreatorSection/>
    </div>
  )
};
export default IntroPage;