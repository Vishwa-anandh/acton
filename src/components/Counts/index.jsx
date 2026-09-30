const stats = [
  { value: "100+", label: "Students learning together" },
  { value: "25+", label: "Volunteer educators" },
  { value: "15+", label: "Community events" },
];

const Counts = () => {
  return (
    <div
      className="relative z-[2] grid grid-cols-3 w-[min(800px,calc(100%-40px))] -mt-[58px] mx-auto overflow-hidden border border-[rgba(29,29,31,0.08)] rounded-md bg-white/[.94] shadow-sm [backdrop-filter:blur(20px)] mw560:grid-cols-1 mw560:w-[calc(100%-28px)] mw560:mt-[-34px]"
      aria-label="Acton Tamil School at a glance"
    >
      {stats.map((stat) => (
        <div
          className="grid place-items-center gap-[3px] py-[25px] px-[18px] text-center [&+&]:border-l [&+&]:border-solid [&+&]:border-line mw560:p-[18px] mw560:[&+&]:border-t mw560:[&+&]:border-l-0"
          key={stat.label}
        >
          <strong className="text-maroon text-[clamp(1.8rem,4vw,2.7rem)] font-[760] tracking-[-0.04em]">
            {stat.value}
          </strong>
          <span className="text-ink-soft text-[0.82rem]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Counts;
