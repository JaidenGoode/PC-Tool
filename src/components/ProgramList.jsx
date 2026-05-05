import React, {useMemo, useState} from 'react';
import ProgramCard from './ProgramCard';
import '../styles/theme.css';

export default function ProgramList({programs = [], onOpen, placeholder = 'No programs found', normalize}){
  const [query, setQuery] = useState('');

  // If a normalize function is supplied, use it to map program entries to {id,name,publisher,version,iconUrl,actions}
  const normalized = useMemo(() => {
    if(!programs) return [];
    if(typeof normalize === 'function') return programs.map(normalize);
    // assume items already conform
    return programs;
  }, [programs, normalize]);

  const filtered = useMemo(() => {
    if(!query) return normalized;
    const q = query.toLowerCase();
    return normalized.filter(p => (p.name && p.name.toLowerCase().includes(q)) || (p.publisher && p.publisher.toLowerCase().includes(q)));
  }, [normalized, query]);

  return (
    <div>
      <div className="program-header">
        <input className="search-input" placeholder="Search programs..." value={query} onChange={e => setQuery(e.target.value)} />
        {/* Placeholder for consistent sort/filter controls */}
      </div>

      {filtered.length === 0 ? (
        <div style={{padding:20, color:'var(--text-muted)'}}>{placeholder}</div>
      ) : (
        <div className="program-list" role="list">
          {filtered.map(p => (
            <ProgramCard
              key={p.id || p.name}
              iconUrl={p.iconUrl || p.icon}
              name={p.name}
              version={p.version}
              publisher={p.publisher}
              actions={p.actions || (
                [
                  { label: 'Open', onClick: () => onOpen && onOpen(p), primary: false }
                ]
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
