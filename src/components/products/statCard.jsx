function StatCard({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="flex flex-row-reverse justify-between items-center bg-surface-card rounded-3xl border border-border-subtle p-6 gap-4">
      <div className="flex items-center justify-center p-2 rounded-xl text-accent">
        <Icon size={35} strokeWidth={2}  />
      </div>
      <div>
        <h4 className="text-3xl font-extrabold text-text-primary">{value}</h4>
        <p className="text-text-muted text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
