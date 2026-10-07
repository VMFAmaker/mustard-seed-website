import { ROOT_SEGMENTS, ROOT_TIPS, ROOTS_VIEWBOX } from "@/lib/roots";

const { width: W, height: H, ground: G } = ROOTS_VIEWBOX;
const CX = W / 2;

// The logo's sprout and sun, with its root system growing down beneath the ground line.
export default function Roots({ className = "" }: { className?: string }) {
  return (
    <svg className={`roots ${className}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A mustard seed sprouting, with roots growing down">
      <defs>
        <linearGradient id="root-fade" gradientUnits="userSpaceOnUse" x1="0" y1={G} x2="0" y2={H}>
          <stop offset="0" stopColor="#E3C38E" />
          <stop offset="0.55" stopColor="#C08A45" stopOpacity="0.8" />
          <stop offset="1" stopColor="#C08A45" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="above-ground">
          <rect x="0" y="0" width={W} height={G - 6} />
        </clipPath>
      </defs>

      {/* sun arc, as in the logo */}
      <circle className="roots-sun" cx={CX} cy={G - 105} r="150" clipPath="url(#above-ground)" />

      {/* roots */}
      <g className="roots-lines" stroke="url(#root-fade)" fill="none" strokeLinecap="round">
        {ROOT_SEGMENTS.map(([d, w, order], i) => (
          <path key={i} d={d} pathLength={1} strokeWidth={w} style={{ animationDelay: `${0.5 + order * 0.14}s` }} />
        ))}
      </g>
      <g className="roots-tips">
        {ROOT_TIPS.map(([x, y, order], i) => (
          <circle key={i} cx={x} cy={y} r="2" style={{ animationDelay: `${0.8 + order * 0.14}s` }} />
        ))}
      </g>

      {/* ground */}
      <path className="roots-ground" d={`M60 ${G}Q${CX} ${G - 6} ${W - 60} ${G}Q${CX} ${G + 5} 60 ${G}Z`} />
      <path className="roots-ground" d={`M${CX - 70} ${G}C${CX - 35} ${G - 10} ${CX + 35} ${G - 10} ${CX + 70} ${G}Z`} />

      {/* sprout and seed */}
      <g className="roots-sprout">
        <path className="stem" d={`M${CX} ${G - 4}C${CX} ${G - 26} ${CX - 6} ${G - 46} ${CX + 1} ${G - 72}`} />
        <path className="leaf" d={`M${CX - 1} ${G - 50}C${CX - 22} ${G - 50} ${CX - 40} ${G - 64} ${CX - 46} ${G - 90}C${CX - 22} ${G - 91} ${CX - 3} ${G - 76} ${CX - 1} ${G - 50}Z`} />
        <path className="leaf" d={`M${CX + 1} ${G - 64}C${CX + 11} ${G - 84} ${CX + 28} ${G - 95} ${CX + 54} ${G - 95}C${CX + 50} ${G - 72} ${CX + 28} ${G - 58} ${CX + 1} ${G - 64}Z`} />
        <circle className="seed" cx={CX + 12} cy={G - 11} r="11" />
        <circle className="seed-shine" cx={CX + 8} cy={G - 15} r="3.2" />
      </g>
    </svg>
  );
}
