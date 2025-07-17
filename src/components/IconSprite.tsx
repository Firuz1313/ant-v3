// SVG Icon Sprite Component for performance optimization
export const IconSprite = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ display: "none" }}
  >
    <defs>
      {/* TV Icon */}
      <g id="icon-tv">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </g>

      {/* Settings Icon */}
      <g id="icon-settings">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </g>

      {/* Power Icon */}
      <g id="icon-power">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </g>

      {/* Volume Icon */}
      <g id="icon-volume">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="m19.07 4.93-10 10" />
        <path d="m9.07 14.93 10-10" />
      </g>

      {/* Home Icon */}
      <g id="icon-home">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </g>

      {/* Search Icon */}
      <g id="icon-search">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </g>

      {/* Info Icon */}
      <g id="icon-info">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </g>

      {/* Play Icon */}
      <g id="icon-play">
        <polygon points="5 3 19 12 5 21 5 3" />
      </g>

      {/* Pause Icon */}
      <g id="icon-pause">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </g>

      {/* Stop Icon */}
      <g id="icon-stop">
        <rect x="6" y="6" width="12" height="12" />
      </g>

      {/* Arrow Left */}
      <g id="icon-arrow-left">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12,19 5,12 12,5" />
      </g>

      {/* Arrow Right */}
      <g id="icon-arrow-right">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12,5 19,12 12,19" />
      </g>

      {/* Arrow Up */}
      <g id="icon-arrow-up">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5,12 12,5 19,12" />
      </g>

      {/* Arrow Down */}
      <g id="icon-arrow-down">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19,12 12,19 5,12" />
      </g>

      {/* Menu Icon */}
      <g id="icon-menu">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </g>

      {/* Close/X Icon */}
      <g id="icon-close">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </g>

      {/* Check Icon */}
      <g id="icon-check">
        <polyline points="20,6 9,17 4,12" />
      </g>

      {/* Alert Triangle */}
      <g id="icon-alert">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </g>

      {/* Signal Icon */}
      <g id="icon-signal">
        <path d="M2 20h.01" />
        <path d="M7 20v-4" />
        <path d="M12 20v-8" />
        <path d="M17 20V8" />
        <path d="M22 4v16" />
      </g>

      {/* Wifi Icon */}
      <g id="icon-wifi">
        <path d="M12 20h.01" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </g>
    </defs>
  </svg>
);

// Icon component that uses the sprite
interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon = ({ name, className = "", size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <use xlinkHref={`#icon-${name}`} />
  </svg>
);

// Preload critical icons
export const preloadIcons = () => {
  const criticalIcons = [
    "tv",
    "settings",
    "power",
    "home",
    "search",
    "info",
    "play",
    "pause",
    "volume",
  ];

  // This could be expanded to actually preload icon fonts or sprites
  console.log("Preloading critical icons:", criticalIcons);
};
