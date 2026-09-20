import {
  Bell,
  LayoutDashboard,
  Package,
  PackagePlus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Users,
  Heart,
} from "lucide-react";
import { useState } from "react";

/**
 * Settings page — fully self-contained.
 * No external hooks (no useSettings, no useProfile, no API calls).
 * All state is local to this component via useState.
 * Styled to match a dashboard with: Users, Products, Wishlist, Orders, Create Product.
 */
const Settings = () => {
  // Local-only state (replaces useSettings)
  const [theme, setTheme] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [tableDensity, setTableDensity] = useState("comfortable");
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newUsers: false,
  });

  const resetAllSettings = () => {
    setTheme("light");
    setSidebarCollapsed(false);
    setPageSize(10);
    setTableDensity("comfortable");
    setNotifications({
      newOrders: true,
      lowStock: true,
      newUsers: false,
    });
  };

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-border-subtle bg-surface-elevated p-5 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1px] text-accent">
              Dashboard Configuration
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-text-primary md:text-3xl">
              Settings
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
              Manage how your dashboard looks and behaves across Users,
              Products, Wishlist and Orders.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAllSettings}
            className="
              flex h-11 items-center justify-center gap-2
              rounded-xl border border-border-subtle
              bg-surface-card px-4 text-sm font-medium
              text-text-secondary transition-all duration-200
              hover:border-border-strong
              hover:bg-surface-base
              hover:text-text-primary
            "
          >
            <RotateCcw size={16} />
            Reset Settings
          </button>
        </div>

        {/* Dashboard Settings */}
        <SettingsSection
          icon={LayoutDashboard}
          title="Dashboard"
          description="Control the appearance and behavior of your admin dashboard."
        >
          <div className="divide-y divide-border-subtle">
            <SettingRow
              title="Theme"
              description="Choose how the dashboard should appear."
            >
              <ThemeSelector value={theme} onChange={setTheme} />
            </SettingRow>

            <SettingRow
              title="Sidebar"
              description="Show or hide the dashboard sidebar."
            >
              <Toggle
                checked={!sidebarCollapsed}
                onChange={(value) => setSidebarCollapsed(!value)}
                label="Show sidebar"
              />
            </SettingRow>

            <SettingRow
              title="Default Page Size"
              description="Number of records shown in paginated tables (Products, Orders, Users, Wishlist)."
            >
              <SelectSetting
                value={String(pageSize)}
                onChange={(value) => setPageSize(Number(value))}
                ariaLabel="Default page size"
                options={[
                  { value: "5", label: "5 items" },
                  { value: "10", label: "10 items" },
                  { value: "20", label: "20 items" },
                  { value: "50", label: "50 items" },
                ]}
              />
            </SettingRow>

            <SettingRow
              title="Table Density"
              description="Control the spacing inside dashboard tables."
            >
              <SelectSetting
                value={tableDensity}
                onChange={setTableDensity}
                ariaLabel="Table density"
                options={[
                  { value: "compact", label: "Compact" },
                  { value: "comfortable", label: "Comfortable" },
                  { value: "spacious", label: "Spacious" },
                ]}
              />
            </SettingRow>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          icon={Bell}
          title="Notifications"
          description="Choose which dashboard events you want to be notified about."
        >
          <div className="divide-y divide-border-subtle">
            <SettingRow
              title="New orders"
              description="Get notified when a new order is placed."
            >
              <Toggle
                checked={notifications.newOrders}
                onChange={(value) =>
                  setNotifications((prev) => ({ ...prev, newOrders: value }))
                }
                label="New orders"
              />
            </SettingRow>

            <SettingRow
              title="Low stock"
              description="Get notified when a product's stock is running low."
            >
              <Toggle
                checked={notifications.lowStock}
                onChange={(value) =>
                  setNotifications((prev) => ({ ...prev, lowStock: value }))
                }
                label="Low stock"
              />
            </SettingRow>

            <SettingRow
              title="New users"
              description="Get notified when a new user registers."
            >
              <Toggle
                checked={notifications.newUsers}
                onChange={(value) =>
                  setNotifications((prev) => ({ ...prev, newUsers: value }))
                }
                label="New users"
              />
            </SettingRow>
          </div>
        </SettingsSection>

        {/* Dashboard Preview */}
        <SettingsSection
          icon={LayoutDashboard}
          title="Dashboard Preview"
          description="Preview how your current dashboard preferences will look."
        >
          <DashboardPreview theme={theme} sidebarCollapsed={sidebarCollapsed} />
        </SettingsSection>

        {/* Quick links to dashboard sections */}
        <SettingsSection
          icon={ShieldCheck}
          title="Dashboard Sections"
          description="Jump to the areas these settings apply to."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <SectionLink icon={Users} label="Users" />
            <SectionLink icon={Package} label="Products" />
            <SectionLink icon={Heart} label="Wishlist" />
            <SectionLink icon={ShoppingCart} label="Orders" />
            <SectionLink icon={PackagePlus} label="Add Product" />
          </div>
        </SettingsSection>
      </div>
    </main>
  );
};

/* ---------- Local presentational components ---------- */

function SettingsSection({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm">
      <div className="flex items-start gap-3 border-b border-border-subtle px-5 py-4 sm:px-6">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
          <Icon size={16} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <p className="mt-0.5 text-xs text-text-muted">{description}</p>
        </div>
      </div>

      <div className="px-5 py-2 sm:px-6">{children}</div>
    </section>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ThemeSelector({ value, onChange }) {
  const options = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  return (
    <div className="inline-flex rounded-xl border border-border-subtle bg-surface-base p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            value === opt.value
              ? "bg-accent text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-10 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-accent" : "bg-border-strong"
      }`}
    >
      <span
        className={`absolute top-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-0" : "-translate-x-5"
        }`}
      />
    </button>
  );
}

function SelectSetting({ value, onChange, options, ariaLabel }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="
        h-10 rounded-xl border border-border-subtle bg-surface-base
        px-3 text-sm text-text-primary outline-none transition-colors
        duration-200 focus:border-accent
      "
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function SectionLink({ icon: Icon, label }) {
  return (
    <div
      className="
        flex flex-col items-center gap-2 rounded-2xl border border-border-subtle
        bg-surface-base p-4 text-center transition-all duration-200
        hover:border-border-strong hover:bg-surface-elevated
      "
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-accent-light text-accent">
        <Icon size={18} />
      </div>

      <span className="text-xs font-medium text-text-primary">{label}</span>
    </div>
  );
}

function DashboardPreview({ theme, sidebarCollapsed }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isDark
          ? "border-[#1f242f] bg-[#0b0c10]"
          : "border-[#e8e5dc] bg-[#faf9f6]"
      }`}
    >
      <div className="flex">
        {/* Fake sidebar */}
        <div
          className={`flex flex-col gap-2 border-r p-3 transition-all duration-200 ${
            isDark
              ? "border-[#1f242f] bg-[#111319]"
              : "border-[#e8e5dc] bg-white"
          } ${sidebarCollapsed ? "w-14" : "w-40"}`}
        >
          {[Users, Package, Heart, ShoppingCart, PackagePlus].map((Icon, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 ${
                i === 1
                  ? "bg-accent-light text-accent"
                  : isDark
                    ? "text-[#6b768b]"
                    : "text-[#8c8677]"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {!sidebarCollapsed && (
                <span className="truncate text-xs font-medium">
                  {
                    [
                      "Users",
                      "Products",
                      "Wishlist",
                      "Orders",
                      "Add Product",
                    ][i]
                  }
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1 p-4">
          <div
            className={`mb-3 h-4 w-32 rounded ${
              isDark ? "bg-[#1f242f]" : "bg-[#e8e5dc]"
            }`}
          />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-14 rounded-lg ${
                  isDark ? "bg-[#171a22]" : "bg-white border border-[#e8e5dc]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
