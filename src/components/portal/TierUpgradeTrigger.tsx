"use client";

import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function TierUpgradeTrigger({
  children = "Request Tier Upgrade",
  className = "inline-block text-xs uppercase tracking-wider font-bold text-earth underline hover:text-sand cursor-pointer bg-transparent border-0 p-0 text-left",
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-tier-upgrade"));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
