import { useEffect, useRef } from "react";

type ToolBadge =
  | { kind: "svg"; viewBox: string; paths: { d: string; fill?: string }[]; color: string }
  | { kind: "badge"; bg: string; text: string; textColor: string; border?: string };

type Tool = {
  name: string;
  badge: ToolBadge;
};

const tools: Tool[] = [
  {
    name: "Tailwind CSS",
    badge: {
      kind: "svg",
      color: "#06B6D4",
      viewBox: "0 0 24 24",
      paths: [
        { d: "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2-1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z" },
      ],
    },
  },
  {
    name: "Photoshop",
    badge: { kind: "badge", bg: "#001e36", text: "Ps", textColor: "#31A8FF" },
  },
  {
    name: "Illustrator",
    badge: { kind: "badge", bg: "#330000", text: "Ai", textColor: "#FF9A00" },
  },
  {
    name: "Premiere Pro",
    badge: { kind: "badge", bg: "#00005b", text: "Pr", textColor: "#9999FF" },
  },
  {
    name: "After Effects",
    badge: { kind: "badge", bg: "#00005b", text: "Ae", textColor: "#9999FF" },
  },
  {
    name: "InDesign",
    badge: { kind: "badge", bg: "#49021f", text: "Id", textColor: "#FF3366" },
  },
  {
    name: "Figma",
    badge: {
      kind: "svg",
      color: "#F24E1E",
      viewBox: "0 0 38 57",
      paths: [
        { d: "M19 28.5C19 25.98 20 23.56 21.78 21.78C23.56 20 25.98 19 28.5 19C31.02 19 33.44 20 35.22 21.78C36.99 23.56 38 25.98 38 28.5C38 31.02 36.99 33.44 35.22 35.22C33.44 36.99 31.02 38 28.5 38C25.98 38 23.56 36.99 21.78 35.22C20 33.44 19 31.02 19 28.5Z", fill: "#1ABCFE" },
        { d: "M0 47.5C0 44.98 1 42.56 2.78 40.78C4.56 39 6.98 38 9.5 38H19V47.5C19 50.02 17.99 52.44 16.22 54.22C14.44 55.99 12.02 57 9.5 57C6.98 57 4.56 55.99 2.78 54.22C1 52.44 0 50.02 0 47.5Z", fill: "#0ACF83" },
        { d: "M19 0V19H28.5C31.02 19 33.44 17.99 35.22 16.22C36.99 14.44 38 12.02 38 9.5C38 6.98 36.99 4.56 35.22 2.78C33.44 1 31.02 0 28.5 0H19Z", fill: "#FF7262" },
        { d: "M0 9.5C0 12.02 1 14.44 2.78 16.22C4.56 17.99 6.98 19 9.5 19H19V0H9.5C6.98 0 4.56 1 2.78 2.78C1 4.56 0 6.98 0 9.5Z", fill: "#F24E1E" },
        { d: "M0 28.5C0 31.02 1 33.44 2.78 35.22C4.56 36.99 6.98 38 9.5 38H19V19H9.5C6.98 19 4.56 20 2.78 21.78C1 23.56 0 25.98 0 28.5Z", fill: "#A259FF" },
      ],
    },
  },
  {
    name: "VS Code",
    badge: {
      kind: "svg",
      color: "#007ACC",
      viewBox: "0 0 24 24",
      paths: [
        { d: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" },
      ],
    },
  },
  {
    name: "JavaScript",
    badge: {
      kind: "svg",
      color: "#F7DF1E",
      viewBox: "0 0 630 630",
      paths: [
        { d: "M0 0h630v630H0z", fill: "#f7df1e" },
        { d: "M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 37.91 30.45 19.4 0 31.65-7.61 31.65-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z", fill: "#323330" },
      ],
    },
  },
  {
    name: "React",
    badge: {
      kind: "svg",
      color: "#61DAFB",
      viewBox: "0 0 24 24",
      paths: [
        { d: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.088-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.296zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.133zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.57-.216 1.162-.43 1.788-.618zm7.26 0c.695.19 1.366.42 1.99.645-.18.637-.406 1.29-.67 1.947a23.88 23.88 0 0 0-.308-.589 24.15 24.15 0 0 0-.707-1.168zm-3.602 4.87c-.54 0-1.067-.022-1.577-.07a22.716 22.716 0 0 0 .686.93 24.026 24.026 0 0 0 1.76 1.96 23.696 23.696 0 0 0 1.76-1.96 22.46 22.46 0 0 0 .685-.93c-.51.047-1.037.07-1.577.07l-.737.002z" },
      ],
    },
  },
  {
    name: "Node.js",
    badge: {
      kind: "svg",
      color: "#339933",
      viewBox: "0 0 24 24",
      paths: [
        { d: "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" },
      ],
    },
  },
  {
    name: "HTML & CSS",
    badge: {
      kind: "svg",
      color: "#E34F26",
      viewBox: "0 0 24 24",
      paths: [
        { d: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" },
      ],
    },
  },
];

function ToolBadgeIcon({ badge }: { badge: ToolBadge }) {
  if (badge.kind === "badge") {
    return (
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 6,
          backgroundColor: badge.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: badge.textColor,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          {badge.text}
        </span>
      </div>
    );
  }

  return (
    <svg
      viewBox={badge.viewBox}
      width="36"
      height="36"
      style={{ flexShrink: 0 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {badge.paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill ?? badge.color} />
      ))}
    </svg>
  );
}

export function ToolsMarquee() {
  const allTools = [...tools, ...tools];
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const baseSpeedRef = useRef(-1.2);

  useEffect(() => {
    function animate() {
      if (!isDraggingRef.current) {
        velocityRef.current += (baseSpeedRef.current - velocityRef.current) * 0.05;
      } else {
        velocityRef.current *= 0.92;
      }
      offsetRef.current += velocityRef.current;
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth / 2;
        if (offsetRef.current <= -totalWidth) offsetRef.current += totalWidth;
        if (offsetRef.current > 0) offsetRef.current -= totalWidth;
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = (dx / dt) * 16;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  }

  function onMouseUp() {
    isDraggingRef.current = false;
  }

  return (
    <div
      className="relative overflow-hidden py-8"
      style={{
        borderTop: "1px solid #1f1f1f",
        borderBottom: "1px solid #1f1f1f",
        backgroundColor: "#0d0d0d",
        cursor: "grab",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
      />

      <div
        ref={trackRef}
        className="flex w-max"
        style={{ willChange: "transform" }}
      >
        {allTools.map((tool, index) => (
          <div key={index} className="flex items-center gap-4 mx-8 shrink-0 group">
            <ToolBadgeIcon badge={tool.badge} />
            <span
              className="text-lg font-semibold whitespace-nowrap tracking-wide transition-colors duration-300 group-hover:text-[#F5C518]"
              style={{ color: "#555", fontFamily: "Outfit, sans-serif" }}
            >
              {tool.name}
            </span>
            <span
              className="ml-4 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: "#F5C518", opacity: 0.4 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToolsMarquee;