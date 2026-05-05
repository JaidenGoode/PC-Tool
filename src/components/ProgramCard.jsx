import React from 'react';
import '../styles/theme.css';

export default function ProgramCard({iconUrl, name, version, publisher, actions = []}){
  return (
    <div className="program-card surface" role="listitem">
      <div className="icon">
        {iconUrl ? <img src={iconUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.02)" />
          </svg>
        )}
      </div>

      <div className="meta">
        <div className="name">{name}</div>
        <div className="desc">{publisher || 'Unknown publisher'} • {version || '—'}</div>
      </div>

      <div className="actions">
        {actions.map((act, i) => (
          <button key={i} className={act.primary ? 'btn-primary' : 'btn-secondary'} onClick={() => act.onClick && act.onClick()} aria-label={act.label}>
            {act.label}
          </button>
        ))}
      </div>
    </div>
  );
}
