interface SuperHeavyChartProps {
  data: {
    total: number;
  };
}

const SuperHeavyChart = ({ data }: SuperHeavyChartProps) => {
  console.log("Render SuperHeavyChart: Komponen 2MB dimuat.");

  const chartData = [35, 60, 42, 75, 55, 90, 65];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-full rounded-2xl border border-[#27272A] bg-[#18181B] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#FAFAFA]">
            User Analytics
          </h3>

          <p className="text-sm text-[#A1A1AA]">Monthly Overview</p>
        </div>

        <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {data?.total ?? 0} Users
        </div>
      </div>

      <div className="relative flex h-72 items-end justify-between gap-5">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-t border-[#27272A]" />
          ))}
        </div>

        {chartData.map((height, index) => (
          <div
            key={index}
            className="z-10 h-full flex flex-1 flex-col items-center justify-end">
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-purple-500 shadow-[0_0_18px_rgba(34,211,238,.20)] transition-all duration-300 hover:scale-105"
              style={{ height: `${height}%` }}
            />

            <span className="mt-3 text-xs text-[#71717A]">{labels[index]}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between border-t border-[#27272A] pt-5">
        <div>
          <p className="text-xs text-[#71717A]">Active Users</p>

          <p className="text-xl font-bold text-[#22D3EE]">{data?.total ?? 0}</p>
        </div>

        <div>
          <p className="text-xs text-[#71717A]">Growth</p>

          <p className="text-xl font-bold text-[#22C55E]">+18%</p>
        </div>

        <div>
          <p className="text-xs text-[#71717A]">Revenue</p>

          <p className="text-xl font-bold text-[#A855F7]">$12.4K</p>
        </div>
      </div>
    </div>
  );
};

export default SuperHeavyChart;
