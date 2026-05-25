"use client";

import { useCallback, useState, type ReactNode } from "react";

export type AssetLoadState = "pending" | "loaded" | "error";

type PausePetAssetImageProps = {
  src: string;
  alt: string;
  fallback: ReactNode;
  className?: string;
  imgClassName?: string;
  height?: number;
  priority?: boolean;
  onLoadStateChange?: (state: AssetLoadState) => void;
};

/**
 * Loads a static PNG from /public; renders fallback only when the asset is missing.
 */
export default function PausePetAssetImage({
  src,
  alt,
  fallback,
  className = "",
  imgClassName = "",
  height,
  priority = false,
  onLoadStateChange,
}: PausePetAssetImageProps) {
  const [state, setState] = useState<AssetLoadState>("pending");

  const updateState = useCallback(
    (next: AssetLoadState) => {
      setState(next);
      onLoadStateChange?.(next);
    },
    [onLoadStateChange],
  );

  if (state === "error") {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        style={height ? { height, width: "auto", maxWidth: "100%" } : undefined}
        onLoad={() => updateState("loaded")}
        onError={() => updateState("error")}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
