// Locations.js

// Friend badges shown ON the map — these all represent the same feature
// (Snap Map: seeing where friends are). Tapping any of them opens the same
// info card, just like real  bitmoji pins do.
export const FRIENDS = [
  {
    id: "alex",
    handle: "@Alex",
    x: 53,
    y: 15,
    avatarEmoji: "🧑",
  },
  {
    id: "jess",
    handle: "@Jess",
    x: 80,
    y: 62,
    avatar: "image",
  },
];

// Shared info-card content whenever ANY friend badge on the map is tapped —
// the point isn't "who is Alex", it's "see everyone on Snap Map".
export const SNAP_MAP_INFO = {
  id: "snap-map",
  icon: "📍",
  name: "Find Your Friend",
  feature: "Snap Map",
  tag: "Live Location",
  description:
    "See where your friend is inside EDC and open Snap Map for directions to their location.",
  cta: "Get Directions",
  deepLink: "snapchat://map",
  color: "#C6FF3D",
};
// The Snapchat Dome activation — a physical spot ON the map (unlike the
// friend badges, which represent people, this represents a place). Tapping
// it opens the Lens Kit info, since that's what the real dome activation offers.
export const DOME = {
  id: "dome",
  x: 13,
  y: 57,
  name: "Snapchat Dome",
  feature: "Lens Kit",
  tag: "Exclusive AR",
  description:
    "Step into the Snapchat Dome to unlock AR lenses only available at EDC, and get your Bitmoji featured on the big screen.",
  cta: "Try Lens",
  deepLink: "snapchat://lens",
  color: "#FFFC00",
};

// Standalone features — these are actions, not locations, so they live as
// their own tappable cards below the map instead of pins on top of it.
export const FEATURES = [
  {
    id: "lens",
    icon: "👻",
    name: "Lens Kit",
    feature: "Lens Kit",
    tag: "Exclusive AR",
    description:
      "Unlock AR effects only available at EDC. Point your camera and try it on.",
    cta: "Try Lens",
    deepLink: "https://www.snapchat.com/lens/a1e02b83773d42839e3bb9b78d2da6e4?sender_web_id=e924206a-629a-4d8a-bdf6-6bdf50ec58a8&device_type=desktop&is_copy_url=true",
    color: "#FFFC00",
  },
  {
    id: "spotlight",
    icon: "⭐",
    name: "Spotlight",
    feature: "Spotlight",
    tag: "Live Now",
    description:
      "Watch the best fan videos and performance highlights from tonight's shows.",
    cta: "Watch Spotlight",
    deepLink: "snapchat://spotlight",
    color: "#FF3EA5",
  },
  {
    id: "discover",
    icon: "📰",
    name: "Discover",
    feature: "Discover",
    tag: "Editorial",
    description:
      "Behind-the-scenes stories, artist interviews, and daily festival coverage.",
    cta: "Read Stories",
    deepLink: "snapchat://discover",
    color: "#FF8A3D",
  },
  {
    id: "snapped",
    icon: "📸",
    name: "Snapped @ EDC",
    feature: "Snapped @ EDC",
    tag: "Community",
    description:
      "See the community's favorite festival moments, curated all weekend long.",
    cta: "View Gallery",
    deepLink: "snapchat://snapped-edc",
    color: "#B983FF",
  },
];