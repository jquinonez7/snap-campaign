// FestivalMap.js
// Decorative background layer only — renders the illustrated festival map.
// Interactive hotspot buttons are layered on top of this in HomeScreen.js.
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";

// Deterministic "irregular polygon" generator — gives each zone an organic,
// hand-drawn blob shape instead of a perfect circle. Same seed array always
// produces the same shape, so it's stable across re-renders.
function buildBlobPath(cx, cy, baseR, variances) {
  const n = variances.length;
  const pts = variances.map((v, i) => {
    const angle = (i / n) * Math.PI * 2;
    const r = baseR * v;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  let d = `M ${mid(pts[n - 1], pts[0]).x.toFixed(2)},${mid(
    pts[n - 1],
    pts[0]
  ).y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const next = pts[(i + 1) % n];
    const m = mid(pts[i], next);
    d += ` Q ${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${m.x.toFixed(
      2
    )},${m.y.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

// Zone definitions: center + radius (in 0-100 viewBox units) + label.
// Positions loosely mirror the hotspot x/y in Locations.js so the glow
// sits behind the tappable dot.
const ZONES = [
  {
    id: "kineticField",
    cx: 32,
    cy: 22,
    r: 17,
    color: "#C6FF3D",
    label: "KINETIC FIELD",
    variances: [1, 1.15, 0.85, 1.2, 0.9, 1.1, 0.95, 1.05],
  },
  {
    id: "snapDome",
    cx: 18,
    cy: 55,
    r: 15,
    color: "#FFFC00",
    label: "SNAPCHAT DOME",
    variances: [1.1, 0.9, 1.05, 1.2, 0.85, 1.1, 1, 0.95],
  },
  {
    id: "cosmicMeadow",
    cx: 36,
    cy: 44,
    r: 14,
    color: "#FF3EA5",
    label: "COSMIC MEADOW",
    variances: [0.95, 1.1, 1, 1.15, 0.9, 1.05, 0.9, 1.1],
  },
  {
    id: "bassPod",
    cx: 68,
    cy: 32,
    r: 16,
    color: "#B983FF",
    label: "BASS POD",
    variances: [1.05, 0.9, 1.15, 0.95, 1.1, 0.85, 1.2, 1],
  },
  {
    id: "circuitGrounds",
    cx: 75,
    cy: 60,
    r: 18,
    color: "#FF8A3D",
    label: "CIRCUIT GROUNDS",
    variances: [1, 1.2, 0.9, 1.1, 0.95, 1.15, 0.85, 1.05],
  },
];

const STARS = Array.from({ length: 26 }).map((_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 100,
  r: (i % 3) * 0.25 + 0.3,
}));

export default function FestivalMap() {
  const zonePaths = useMemo(
    () =>
      ZONES.map((z) => ({
        ...z,
        d: buildBlobPath(z.cx, z.cy, z.r, z.variances),
      })),
    []
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          <RadialGradient id="bg" cx="50%" cy="35%" r="75%">
            <Stop offset="0%" stopColor="#1a1030" stopOpacity="1" />
            <Stop offset="100%" stopColor="#05030c" stopOpacity="1" />
          </RadialGradient>
          {zonePaths.map((z) => (
            <RadialGradient
              key={`grad-${z.id}`}
              id={`glow-${z.id}`}
              cx="50%"
              cy="50%"
              r="60%"
            >
              <Stop offset="0%" stopColor={z.color} stopOpacity="0.55" />
              <Stop offset="100%" stopColor={z.color} stopOpacity="0" />
            </RadialGradient>
          ))}
        </Defs>

        {/* night sky background */}
        <Rect x="0" y="0" width="100" height="100" fill="url(#bg)" />

        {/* stars */}
        {STARS.map((s, i) => (
          <Circle
            key={`star-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#ffffff"
            opacity={0.5}
          />
        ))}

        {/* zone glows + blobs */}
        {zonePaths.map((z) => (
          <React.Fragment key={z.id}>
            <Circle
              cx={z.cx}
              cy={z.cy}
              r={z.r * 1.6}
              fill={`url(#glow-${z.id})`}
            />
            <Path d={z.d} fill={z.color} opacity={0.28} />
            <Path
              d={z.d}
              fill="none"
              stroke={z.color}
              strokeWidth={0.4}
              opacity={0.8}
            />
          </React.Fragment>
        ))}

        {/* zone labels */}
        {zonePaths.map((z) => (
          <SvgText
            key={`label-${z.id}`}
            x={z.cx}
            y={z.cy + z.r + 4}
            fill={z.color}
            fontSize="3.1"
            fontWeight="700"
            textAnchor="middle"
            opacity={0.9}
          >
            {z.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
