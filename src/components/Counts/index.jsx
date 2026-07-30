const stats = [
  { value: "100+", label: "Students learning together" },
  { value: "25+", label: "Volunteer educators" },
  { value: "15+", label: "Community events" },
];

const Counts = () => {
  return (
    <div className="stats-card" aria-label="Acton Tamil School at a glance">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Counts;
