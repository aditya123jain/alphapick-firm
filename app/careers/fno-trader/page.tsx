import type { Metadata } from "next";
import RolePage from "@/components/RolePage";
import NseHours from "@/components/NseHours";
import { FNO_ROLE, roleMetadata } from "@/lib/site";

export const metadata: Metadata = roleMetadata(FNO_ROLE);

export default function FnoRole() {
  return <RolePage role={FNO_ROLE} shift={<NseHours />} shiftLabel="See the hours" />;
}
