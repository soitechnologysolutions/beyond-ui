import React from "react";
import { Image } from "../src/components/Image/Image";

export default {
  title: "Components/Image",
  component: Image,
};

export const RemoteImage = () => (
  <div style={{ width: 320, height: 200 }}>
    <Image
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
      alt="Remote Unsplash"
      className="rounded-lg shadow"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);

export const BrokenImage = () => (
  <div style={{ width: 320, height: 200 }}>
    <Image
      src="https://example.com/this-image-does-not-exist.jpg"
      alt="Broken"
      className="rounded-lg shadow"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);

export const CustomSkeleton = () => (
  <div style={{ width: 320, height: 200 }}>
    <Image
      src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800"
      alt="Custom Skeleton"
      skeletonClassName="bg-gradient-to-r from-primary-100 to-primary-300"
      className="rounded-lg shadow"
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);