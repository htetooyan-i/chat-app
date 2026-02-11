// app/(app)/maintenance.tsx   or pages/maintenance.tsx
"use client";

import React from "react";

export default function Maintenance() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-500">
          🚧 Under Construction
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          This page is currently being developed. Please check back later!
        </p>
        <img
          src="/construction.svg"
          alt="Under Construction"
          className="mx-auto w-40 h-40"
        />
      </div>
    </div>
  );
}
