import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SuperHeavyChartProps {
  data: {
    total: number;
  };
}

const SuperHeavyChart = ({ data }: SuperHeavyChartProps) => {
  console.log("Render SuperHeavyChart: Komponen 2MB dimuat.");

  const chartData = [35, 60, 42, 75, 55, 90, 65];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const yAxisSteps = [100, 80, 60, 40, 20, 0];

  return (
    <div className="w-full rounded-2xl border border-[#27272A] bg-[#18181B] p-6">
      <div className="mb-8">
        <div>
          <h3 className="text-lg font-semibold text-[#FAFAFA]">
            User Analytics
          </h3>
          <p className="text-sm text-[#A1A1AA]">Monthly Overview</p>
        </div>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="flex gap-3">
          <div className="flex h-72 flex-col justify-between pb-6 text-right">
            {yAxisSteps.map((step) => (
              <span key={step} className="text-xs leading-none text-[#71717A]">
                {step}
              </span>
            ))}
          </div>

          <div className="relative flex h-72 flex-1 items-end justify-between gap-5">
            <div className="absolute inset-0 flex flex-col justify-between">
              {yAxisSteps.map((step) => (
                <div key={step} className="border-t border-[#27272A]" />
              ))}
            </div>

            {chartData.map((height, index) => (
              <div
                key={index}
                className="z-10 flex h-full flex-1 flex-col items-center justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.12,
                        type: "spring",
                        stiffness: 90,
                        damping: 12,
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(34,211,238,.18)",
                      }}
                      className="w-full cursor-pointer rounded-t-xl bg-gradient-to-t from-[#22D3EE] to-[#A855F7]"
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="border border-[#27272A] bg-[#18181B] text-[#FAFAFA]">
                    <p className="text-xs font-medium">
                      {labels[index]}:{" "}
                      <span className="text-[#22D3EE]">{height}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>

                <span className="mt-3 text-xs text-[#71717A]">
                  {labels[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>

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
