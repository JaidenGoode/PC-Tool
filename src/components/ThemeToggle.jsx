import React, {useEffect, useState} from 'react';
import '../styles/theme.css';

const THEME_KEY = 'pc_tool_liquid_glass';

export default function ThemeToggle({className, style}){
  const [on, setOn] = useState(()=>{
    try { return localStorage.getItem(THEME_KEY) === 'true'; } catch { return false; }
  });

  useEffect(()=>{
    try {
      if(on) document.body.classList.add('liquid-glass'); else document.body.classList.remove('liquid-glass');
      localStorage.setItem(THEME_KEY, on ? 'true' : 'false');
    } catch {}
  }, [on]);

  return (
    <label className={className} style={{display:'inline-flex',alignItems:'center',gap:10, ...style}}>
      <span style={{fontSize:13}}>Liquid Glass</span>
      <button
        onClick={() => setOn(v => !v)}
        aria-pressed={on}
        aria-label="Toggle Liquid Glass theme"
        style={{
          width:48, height:28, borderRadius:20, padding:4, border:'none',
          background: on ? 'linear-gradient(90deg,#6dd3ff,#6b7bff)' : 'rgba(255,255,255,0.06)',
          cursor:'pointer'
        }}>
        <div style={{
          width:20, height:20, borderRadius:10,
          background:'#fff',
          transform: on ? 'translateX(20px)' : 'translateX(0)',
          transition:'transform .18s'
        }} />
      </button>
    </label>
  );
}
