"use client";

import React from "react";

type Tabs = "settings" | "files" | "users";

export default function InfoPanel({ type }: { type: Tabs }) {
  return (
    <div className="w-[300px] bg-background text-foreground border-l border-muted-border p-4">
      {type === "settings" && <div>Settings Content</div>}
      {type === "files" && <div>Files Content</div>}
      {type === "users" && <div>Users Content</div>}
    </div>
  );
}
