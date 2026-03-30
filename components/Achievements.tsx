import React from 'react';

const Achievements: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20 pt-8">
      {/* Header Section */}
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-3xl border border-white/10 mb-2 shadow-2xl">
          <i className="fa-solid fa-award text-4xl text-white"></i>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Digital LED Display System
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium tracking-wide">
          An Industry-Academia Collaboration Project bridging academic knowledge with real-world industrial applications.
        </p>
      </div>

      {/* Collaboration Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all duration-500">
          <i className="fa-solid fa-building-columns text-3xl text-white"></i>
          <div>
            <h3 className="font-semibold text-white text-lg">GPREC</h3>
            <p className="text-xs text-white/50 mt-1 font-medium">G. Pulla Reddy Engineering College</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all duration-500">
          <i className="fa-solid fa-industry text-3xl text-white"></i>
          <div>
            <h3 className="font-semibold text-white text-lg">QTPL</h3>
            <p className="text-xs text-white/50 mt-1 font-medium">Quality Technologies Private Limited</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-all duration-500">
          <i className="fa-solid fa-handshake-angle text-3xl text-white"></i>
          <div>
            <h3 className="font-semibold text-white text-lg">PALS</h3>
            <p className="text-xs text-white/50 mt-1 font-medium">Pan IIT Alumni Leadership Series</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Left Column */}
        <div className="space-y-6 sm:space-y-8">
          <section className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <i className="fa-solid fa-bullseye text-white/50"></i> Problem Statement
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-6 font-medium">
              The project involved the design, development, and manufacturing of Digital LED Display Boards for industrial communication within QTPL's production facility.
            </p>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-white mt-1 shrink-0"></i>
                <span><strong className="text-white">Display Size:</strong> 50x100 cm LED digital display.</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-white mt-1 shrink-0"></i>
                <span><strong className="text-white">Connectivity:</strong> Enabled via Wi-Fi and SIM.</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-white mt-1 shrink-0"></i>
                <span><strong className="text-white">Visibility:</strong> Messages must be clearly visible from 50 meters across the 100m x 33m production shop.</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-white mt-1 shrink-0"></i>
                <span><strong className="text-white">Functionality:</strong> Real-time scrolling messages for canteen timings, bus arrivals, overtime schedules, and factory updates.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <i className="fa-solid fa-microchip text-white/50"></i> System Architecture
            </h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-base">3x3 Grid (Real-Time Messages)</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Consists of 9 P10 LED panels, each controlled by a dedicated ESP8266 microcontroller per row. Messages are unicast via MQTT topics, ensuring precise row-wise control. The backend is implemented using a Flask-based web server.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-base">2x2 & 1x1 Grids (Static/Time)</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Driven by Huidu W2 controllers. These are configured via the LED Art app to handle static content, pre-designed animations, and precise time displays.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6 sm:space-y-8">
          <section className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <i className="fa-solid fa-flag-checkered text-white/50"></i> Project Outcomes
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <i className="fa-solid fa-display text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Functional Display System</h4>
                  <p className="text-sm text-white/60 mt-1">Successfully designed and developed a modular digital LED display system.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <i className="fa-solid fa-wifi text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Remote Updating</h4>
                  <p className="text-sm text-white/60 mt-1">Implemented Wi-Fi based remote message updating for seamless control.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <i className="fa-solid fa-bolt text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Real-Time Efficiency</h4>
                  <p className="text-sm text-white/60 mt-1">Ensured real-time communication efficiency within the factory environment.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-white/10 p-3 rounded-full shrink-0">
                  <i className="fa-solid fa-industry text-white text-lg"></i>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white">Industry Impact</h4>
                  <p className="text-sm text-white/60 mt-1">Showcased technical feasibility leading to potential future implementations in other industries.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <i className="fa-solid fa-users text-white/50"></i> Project Team
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Student Team (GPREC)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium text-white/80">S. Jagadeeshwar</div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium text-white/80">S. Akash</div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium text-white/80">P. Santhana Naik</div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-sm font-medium text-white/80">J. Lingavardhan Reddy</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Mentors & Guides</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="bg-white/5 p-4 rounded-2xl border border-white/10"><strong className="text-white">Dr. K. Suresh Reddy</strong> - HOD ECE, GPREC</li>
                <li className="bg-white/5 p-4 rounded-2xl border border-white/10"><strong className="text-white">B. Varalakshmi</strong> - Assistant Professor, GPREC</li>
                <li className="bg-white/5 p-4 rounded-2xl border border-white/10"><strong className="text-white">Mr. Ravi Chandramouli</strong> - Managing Director, QTPL</li>
                <li className="bg-white/5 p-4 rounded-2xl border border-white/10"><strong className="text-white">Mr. S. Krishna Kumar</strong> - PALS Mentor</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-12 space-y-8">
        <section className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
            <i className="fa-solid fa-location-dot text-white/50"></i> Implementation Site
          </h2>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-8">
            <div className="flex items-center gap-6 flex-col sm:flex-row">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shrink-0">
                <i className="fa-solid fa-building text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white text-xl">Quality Technologies Private Limited (QTPL)</h3>
                <p className="text-base text-white/60 mt-2 font-medium">Industrial manufacturing facility where the LED display system was deployed.</p>
              </div>
            </div>
            <a 
              href="https://maps.app.goo.gl/U9rD78ERPzYkqyj79" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full text-sm font-semibold transition-all shrink-0"
            >
              <i className="fa-solid fa-map-location-dot"></i> View on Google Maps
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Achievements;
