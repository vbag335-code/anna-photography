"use client";
import { useState, useEffect, useCallback } from "react";

type Tweaks = { theme: "dark" | "light"; photos: "color" | "mono"; gutter: number };

const DEFAULTS: Tweaks = { theme: "dark", photos: "color", gutter: 2 };

function applyTweaks(t: Tweaks) {
  document.documentElement.dataset.theme = t.theme;
  document.documentElement.dataset.bw = t.photos === "mono" ? "1" : "0";
  document.documentElement.style.setProperty("--gutter", t.gutter + "px");
  try { localStorage.setItem("anna-tweaks", JSON.stringify(t)); } catch {}
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<Tweaks>(DEFAULTS);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("anna-tweaks") || "null");
      if (saved) setT({ ...DEFAULTS, ...saved });
    } catch {}
  }, []);

  useEffect(() => { applyTweaks(t); }, [t]);

  const set = useCallback(<K extends keyof Tweaks>(k: K, v: Tweaks[K]) => {
    setT((prev) => ({ ...prev, [k]: v }));
  }, []);

  const idx = (val: string, opts: string[]) => opts.indexOf(val);

  function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: T[]; onChange: (v: T) => void }) {
    const i = options.indexOf(value);
    const n = options.length;
    return (
      <div className="twk-row">
        <div className="twk-lbl"><span>{label}</span></div>
        <div className="twk-seg">
          <div className="twk-seg-thumb" style={{ left: `calc(2px + ${i} * (100% - 4px) / ${n})`, width: `calc((100% - 4px) / ${n})` }} />
          {options.map((o) => (
            <button key={o} type="button" onClick={() => onChange(o)}>{o}</button>
          ))}
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", right: 16, bottom: 16, zIndex: 9999,
          appearance: "none", border: "1px solid var(--line)", background: "var(--panel)",
          color: "var(--muted)", padding: "7px 14px", cursor: "pointer",
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
        title="Open tweaks"
      >
        Tweaks
      </button>
    );
  }

  return (
    <div className="twk-panel">
      <div className="twk-hd">
        <b>Tweaks</b>
        <button className="twk-x" onClick={() => setOpen(false)}>✕</button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">Gallery</div>
        <Seg label="Mode" value={t.theme} options={["dark", "light"] as const} onChange={(v) => set("theme", v)} />
        <Seg label="Photos" value={t.photos} options={["color", "mono"] as const} onChange={(v) => set("photos", v)} />
        <div className="twk-sect">Layout</div>
        <div className="twk-row">
          <div className="twk-lbl"><span>Gutter</span><span style={{ color: "rgba(41,38,27,.5)" }}>{t.gutter}px</span></div>
          <input type="range" className="twk-slider" min={1} max={24} value={t.gutter}
            onChange={(e) => set("gutter", Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
