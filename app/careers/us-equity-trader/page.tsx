import type { Metadata } from "next";
import RolePage from "@/components/RolePage";
import ShiftTimeline from "@/components/ShiftTimeline";
import { ROLE, roleMetadata } from "@/lib/site";

export const metadata: Metadata = roleMetadata(ROLE);

export default function Role() {
  return <RolePage role={ROLE} shift={<ShiftTimeline />} />;
}
