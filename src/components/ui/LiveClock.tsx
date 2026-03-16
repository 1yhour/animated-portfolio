import { useTime } from "@/hooks/useTime";
import { cn } from "@/lib/utils";

type LiveClockProps = {
  className?: string;
};

export default function LiveClock({ className }: LiveClockProps) {
  const time = useTime();
  return (
    <div className={cn(className)}>
        {time}
    </div>
  );
}
