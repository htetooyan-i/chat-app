import { Suspense } from "react";
import SettingsContent from "./SettingsContent";

function page() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}

export default page;