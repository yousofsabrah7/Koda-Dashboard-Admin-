import { ChevronDown } from "lucide-react";

const Filter = ({ filters = [], values = {}, onChange, showFilters }) => {
  const filterCols = filters.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <div className="relative">
      {/* Filters */}
      <div
        className={`
          mx-auto
          absolute -left-20 top-15 z-20
          grid
          grid-cols-1
          gap-3
          rounded-xl
          border border-border-subtle
          bg-surface-card
          p-3
          shadow-lg
          ${
            showFilters
              ? "h-fit visible opacity-100"
              : "h-0 invisible pointer-events-none opacity-0"
          }

          transition-all duration-300 ease-linear
          md:static
          md:visible
          md:pointer-events-auto
          md:w-fit
          md:max-w-none
          md:grid-cols-3
          md:border-0
          md:bg-transparent
          md:p-0
          md:shadow-none          
          ${filterCols}

        `}
      >
        {filters.map((filter) => {
          const {
            name,
            label,
            type = "select",
            options = [],
            placeholder,
          } = filter;

          {
            /* Select */
          }
          if (type === "select") {
            return (
              <div key={name} className="relative w-full mx-auto">
                <select
                  value={values[name] ?? ""}
                  onChange={(e) => onChange?.(name, e.target.value)}
                  className="
                    h-12
                    md:min-w-35
                    w-full
                    appearance-none
                    rounded-xl
                    border border-border-subtle
                    bg-surface-card
                    px-4 pr-7.5 md:pr-10
                    text-sm
                    text-text-primary
                    outline-none
                    transition

                    hover:border-border-strong
                    focus:border-accent
                    focus:ring-1
                    focus:ring-accent
                  "
                >
                  <option value="">{placeholder || label}</option>

                  {options.map((option) => {
                    const value =
                      typeof option === "object" ? option.value : option;

                    const label =
                      typeof option === "object" ? option.label : option;

                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>

                <ChevronDown
                  size={16}
                  className="
                    pointer-events-none
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    text-text-muted
                  "
                />
              </div>
            );
          }

          {
            /* Input */
          }
          return (
            <div key={name} className="w-fit mx-auto">
              <input
                type={type}
                value={values[name] ?? ""}
                placeholder={placeholder || label}
                onChange={(e) => onChange?.(name, e.target.value)}
                className="
                  h-12
                  md:min-w-35
                  w-full
                  rounded-xl
                  border border-border-subtle
                  bg-surface-card
                  px-4
                  text-sm
                  text-text-primary
                  placeholder:text-text-muted
                  outline-none
                  transition
                  hover:border-border-strong
                  focus:border-accent
                  focus:ring-1
                  focus:ring-accent
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
