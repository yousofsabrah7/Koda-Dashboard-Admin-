import React from "react";

const Header = ({ title, desc, subtitle = "", search, addBtn }) => {
  return (
    <div className="border border-border-subtle bg-surface-card text-text-primary p-5 md:p-8 flex rounded-3xl shadow-xs justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-accent text-xs uppercase font-mono font-semibold">
          {subtitle}
        </p>

        <h1 className="text-3xl sm:text-2xl font-bold font-display text-text-primary">
          {title}
        </h1>

        <p className="text-text-secondary text-sm">{desc}</p>
      </div>
      <div>
        <div>{search}</div>
        <div>{addBtn}</div>
      </div>
    </div>
  );
};

export default Header;
