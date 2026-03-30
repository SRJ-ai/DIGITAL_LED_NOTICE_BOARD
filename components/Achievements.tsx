import React from 'react';

const Achievements: React.FC = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px', paddingTop: '24px' }}>

      {/* Hero */}
      <div className="animate-fade-in-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="hero-badge" style={{ margin: '0 auto 20px' }}>
          <i className="fa-solid fa-satellite-dish" style={{ fontSize: '28px', color: 'var(--color-accent)' }}></i>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
          <span className="gradient-text">Digital LED Display</span><br />
          <span style={{ color: 'var(--color-text)' }}>System</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
          An Industry-Academia Collaboration bridging academic knowledge with real-world industrial applications.
        </p>
      </div>

      {/* Collaboration Badges */}
      <div className="animate-fade-in-up animate-delay-1 collab-grid" style={{ marginBottom: '48px' }}>
        {[
          { icon: 'fa-building-columns', name: 'GPREC', desc: 'G. Pulla Reddy Engineering College', gradient: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.2)' },
          { icon: 'fa-industry', name: 'QTPL', desc: 'Quality Technologies Pvt. Ltd.', gradient: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.2)' },
          { icon: 'fa-handshake-angle', name: 'PALS', desc: 'Pan IIT Alumni Leadership Series', gradient: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.2)' },
        ].map(org => (
          <div key={org.name} className="glass-panel achievement-card collab-card" style={{ padding: '28px 20px' }}>
            <div className="collab-icon" style={{ background: org.gradient, borderColor: org.border }}>
              <i className={`fa-solid ${org.icon}`} style={{ fontSize: '20px', color: 'var(--color-text)' }}></i>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{org.name}</h3>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>{org.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="achievements-grid">
        {/* Problem Statement */}
        <div className="glass-panel achievement-card animate-fade-in-up animate-delay-2" style={{ padding: '32px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            <i className="fa-solid fa-bullseye"></i> Problem Statement
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
            Design, develop, and manufacture Digital LED Display Boards for industrial communication within QTPL's production facility.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Display Size', value: '50×100 cm LED digital display' },
              { label: 'Connectivity', value: 'Wi-Fi and SIM enabled' },
              { label: 'Visibility', value: 'Readable from 50m across 100m × 33m shop' },
              { label: 'Functionality', value: 'Real-time scrolling messages for factory ops' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.06)', borderRadius: 'var(--radius-sm)' }}>
                <i className="fa-solid fa-check" style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0, fontSize: '12px' }}></i>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-text)' }}>{item.label}:</strong> {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="glass-panel achievement-card animate-fade-in-up animate-delay-2" style={{ padding: '32px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            <i className="fa-solid fa-flag-checkered"></i> Outcomes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: 'fa-display', title: 'Functional Display System', desc: 'Modular digital LED display system.', color: 'var(--color-accent)' },
              { icon: 'fa-wifi', title: 'Remote Updating', desc: 'Wi-Fi based remote message updating.', color: '#a78bfa' },
              { icon: 'fa-bolt', title: 'Real-Time Efficiency', desc: 'Real-time factory communication.', color: 'var(--color-warning)' },
              { icon: 'fa-industry', title: 'Industry Impact', desc: 'Technical feasibility demonstrated.', color: 'var(--color-success)' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`fa-solid ${item.icon}`} style={{ color: item.color, fontSize: '15px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="glass-panel achievement-card animate-fade-in-up animate-delay-3" style={{ padding: '32px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            <i className="fa-solid fa-microchip"></i> Architecture
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(34,211,238,0.05), rgba(139,92,246,0.03))', borderRadius: 'var(--radius-md)', border: '1px solid rgba(34,211,238,0.1)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                <i className="fa-solid fa-table-cells" style={{ marginRight: '8px', color: 'var(--color-accent)', fontSize: '12px' }}></i>
                3×3 Grid — Real-Time
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                9 P10 LED panels with dedicated ESP8266 per row. MQTT unicast with Flask backend.
              </p>
            </div>
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(52,211,153,0.03))', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139,92,246,0.1)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                <i className="fa-solid fa-display" style={{ marginRight: '8px', color: '#a78bfa', fontSize: '12px' }}></i>
                2×2 & 1×1 — Static/Time
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                Huidu W2 controllers via LED Art app for static content and time displays.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="glass-panel achievement-card animate-fade-in-up animate-delay-3" style={{ padding: '32px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>
            <i className="fa-solid fa-users"></i> Team
          </h2>
          <div style={{ marginBottom: '24px' }}>
            <h3 className="field-label" style={{ marginBottom: '12px' }}>Student Team (GPREC)</h3>
            <div className="team-grid">
              {['S. Jagadeeshwar', 'S. Akash', 'P. Santhana Naik', 'J. Lingavardhan Reddy'].map(name => (
                <div key={name} style={{ padding: '12px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'var(--color-accent)', flexShrink: 0 }}>
                    {name.charAt(0)}
                  </div>
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="field-label" style={{ marginBottom: '12px' }}>Mentors & Guides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Dr. K. Suresh Reddy', role: 'HOD ECE, GPREC' },
                { name: 'B. Varalakshmi', role: 'Asst. Professor' },
                { name: 'Mr. Ravi Chandramouli', role: 'MD, QTPL' },
                { name: 'Mr. S. Krishna Kumar', role: 'PALS Mentor' },
              ].map(m => (
                <div key={m.name} style={{ padding: '12px 14px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                  <strong style={{ fontWeight: 600 }}>{m.name}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-dim)', fontWeight: 500 }}>{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Site */}
      <div className="glass-panel achievement-card animate-fade-in-up animate-delay-4" style={{ marginTop: '24px', padding: '32px' }}>
        <h2 className="section-title" style={{ marginBottom: '24px' }}>
          <i className="fa-solid fa-location-dot"></i> Implementation Site
        </h2>
        <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(34,211,238,0.04), rgba(139,92,246,0.03))', border: '1px solid rgba(34,211,238,0.08)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(34,211,238,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="fa-solid fa-building" style={{ fontSize: '20px', color: 'var(--color-accent)' }}></i>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Quality Technologies Pvt. Ltd.</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Industrial facility where the LED display was deployed</p>
            </div>
          </div>
          <a href="https://maps.app.goo.gl/U9rD78ERPzYkqyj79" target="_blank" rel="noopener noreferrer" className="btn-primary btn-connect" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-map-location-dot"></i> View on Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
