import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  Star,
  CheckCircle,
  Smartphone,
  CreditCard,
  Clock,
  Package,
  Share2
} from 'lucide-react';

const LandingPage = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "100% FREE Selling",
      description: "List your items in seconds and start selling to fellow students - completely free!"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Free Student Community",
      description: "Connect with classmates in a safe, school-approved marketplace at no cost"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Free Analytics",
      description: "Monitor your inventory and sales with detailed analytics - no subscription needed"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Free",
      description: "Cash-based transactions with admin moderation for safety - all free to use"
    }
  ];

  const stats = [
    { number: "100%", label: "FREE to Use" },
    { number: "0%", label: "Waste Rate" },
    { number: "∞", label: "Potential" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden scroll-smooth">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-green-400/50 to-emerald-500/50 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-red-400/30 to-pink-500/30 rounded-full animate-bounce delay-300"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SchoolSeller</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                About
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 px-6 relative">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute top-32 right-32 w-4 h-4 bg-purple-400 rounded-full opacity-40 animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-cyan-400 rounded-full opacity-40 animate-bounce delay-500"></div>
          <div className="absolute top-1/2 right-20 w-3 h-3 bg-pink-400 rounded-full opacity-40 animate-bounce delay-700"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Logo */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl mb-8 transform hover:scale-110 transition-all duration-300">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                SchoolSeller
              </span>
            </h1>
            
            
            <p className="text-3xl md:text-4xl text-white mb-6 font-semibold">
              Reserve. <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent font-bold">Sell.</span> Profit.
            </p>
            
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
              The <strong className="text-green-400">completely FREE</strong> way to sell snacks and items at school. <strong className="text-yellow-400">No commissions, no fees!</strong> Students reserve what they want, 
              you know exactly how much to bring and who to give it to. <strong className="text-white">Guaranteed sales!</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <button
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white px-12 py-5 rounded-2xl hover:from-green-700 hover:via-green-800 hover:to-green-900 transition-all duration-300 font-bold text-xl flex items-center justify-center space-x-3 shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-2"
              >
                <span>See How It Works</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-white/90 backdrop-blur-sm text-green-600 px-12 py-5 rounded-2xl border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
              >
                <span>View Features</span>
              </button>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="group text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-400 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-8">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-bold text-blue-700">Amazing Features</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Sellers Love SchoolSeller?
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Stop guessing how much to bring! Students reserve what they want, you bring exactly that amount. 
              <strong className="text-green-600">100% FREE</strong> - <strong className="text-yellow-600">No commissions, no fees!</strong> No waste, guaranteed sales, more profit!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Feature Card 1 */}
            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Package className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                FREE Guaranteed Reservations
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Students reserve snacks and items in advance - completely free! You know exactly how much to bring and who to give it to.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-purple-100">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Clock className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                FREE No Waste System
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Stop bringing too much or too little! Students tell you exactly what they want, when they want it - all free!
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-cyan-100">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                FREE Easy Management
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                See all your reservations in one place - completely free! Know who ordered what, when to meet, and how much you'll earn.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-green-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Share2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                FREE Personal Store Link
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get your own shareable link to promote your store! Share on social media, group chats, or campus flyers - completely free!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-tl from-pink-300/20 to-blue-300/20 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-8">
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-bold text-purple-700">Simple Process</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How Reservations Work
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Students reserve, you deliver. It's that simple! No more guessing games.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="group text-center relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                ✨
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold group-hover:scale-110 transition-transform shadow-2xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">List Your Items</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Post what snacks and items you want to sell. Set prices and availability! Get your personal store link to share with students.</p>
            </div>
            
            <div className="group text-center relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                🎯
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold group-hover:scale-110 transition-transform shadow-2xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-purple-600 transition-colors">Students Reserve</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Students visit your store link and reserve what they want. You get a list of exactly what to bring!</p>
            </div>
            
            <div className="group text-center relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                💰
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-red-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-bold group-hover:scale-110 transition-transform shadow-2xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors">Deliver & Profit</h3>
              <p className="text-gray-600 leading-relaxed text-lg">Meet students, give them their reserved items, collect cash. Guaranteed sales, no waste!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">Ready to Start Selling?</h2>
            <p className="text-2xl text-blue-100 mb-8 leading-relaxed">
              Stop guessing how much to bring! Let students reserve what they want - <strong className="text-green-300">100% FREE</strong>! 
              <strong className="text-yellow-300"> No commissions, no fees!</strong> Guaranteed sales, no waste, more profit! 💰
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Get Started in 30 Seconds</h3>
              <p className="text-blue-100 mb-6">Sign in with Google to create your account and start selling today!</p>
              <Link
                to="/login"
                className="group inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <p className="text-blue-200 text-sm">
              <strong>Secure & Private:</strong> Your data is protected with Google's enterprise-grade security
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-400 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Main Content - Takes up 2 columns on desktop */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SchoolSeller</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                The ultimate <strong className="text-green-400">100% FREE</strong> student marketplace for buying, selling, and reserving items on campus. 
                <strong className="text-yellow-400"> No commissions, no fees!</strong> Join thousands of students already using our platform! 🎓
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right side - Single column with both sections stacked */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-blue-300">🎓 For Students</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>🛍️</span><span>Browse Items</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>💰</span><span>Start Selling</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>📖</span><span>How It Works</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>🛡️</span><span>Safety Tips</span></a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 text-purple-300">🆘 Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>❓</span><span>Help Center</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>📞</span><span>Contact Us</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>🚨</span><span>Report Issue</span></a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"><span>🔒</span><span>Privacy Policy</span></a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2025 SchoolSeller. Made with ❤️ for students everywhere! 🎓✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
