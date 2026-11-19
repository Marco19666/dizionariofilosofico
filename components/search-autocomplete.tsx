"use client";

import { useMemo, useState } from "react";

type Props = { id: string; value: string; onChange: (value: string) => void; onSelect?: (value: string) => void; options: string[]; placeholder?: string; label: string };

export default function SearchAutocomplete({ id, value, onChange, onSelect, options, placeholder, label }: Props) {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const matches = useMemo(() => {
    const q = value.trim().toLocaleLowerCase("it");
    const unique = [...new Set(options)];
    if (!q) return unique.slice(0, 8);
    return unique.filter((option) => option.toLocaleLowerCase("it").includes(q)).sort((a,b) => {
      const al = a.toLocaleLowerCase("it"), bl = b.toLocaleLowerCase("it");
      return Number(!al.startsWith(q)) - Number(!bl.startsWith(q)) || a.localeCompare(b,"it");
    }).slice(0, 8);
  }, [options, value]);
  const visible = focused && matches.length > 0;
  function choose(option: string) { onChange(option); onSelect?.(option); setFocused(false); setActive(0); }
  return <div className="search-autocomplete">
    <input id={id} type="search" role="combobox" aria-label={label} aria-autocomplete="list" aria-expanded={visible} aria-controls={id+"-suggestions"} aria-activedescendant={visible ? id+"-option-"+active : undefined} autoComplete="off" placeholder={placeholder} value={value} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(event) => { onChange(event.target.value); setActive(0); }} onKeyDown={(event) => {
      if (!visible) return;
      if (event.key === "ArrowDown") { event.preventDefault(); setActive((current) => (current + 1) % matches.length); }
      else if (event.key === "ArrowUp") { event.preventDefault(); setActive((current) => (current - 1 + matches.length) % matches.length); }
      else if (event.key === "Enter" && matches[active]) { event.preventDefault(); choose(matches[active]); }
      else if (event.key === "Escape") setFocused(false);
    }} />
    {visible && <ul id={id+"-suggestions"} className="search-suggestions" role="listbox">{matches.map((option,index)=><li key={option} role="option" aria-selected={index===active} id={id+"-option-"+index}><button type="button" tabIndex={-1} onMouseDown={(event)=>event.preventDefault()} onClick={()=>choose(option)}>{option}</button></li>)}</ul>}
  </div>;
}
