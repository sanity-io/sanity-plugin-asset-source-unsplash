import React from "react";

export const studio = (storyFn) => (
  <div
    id="sanity"
    style={{
      height: '100vh',
      maxHeight: '100dvh',
      overflow: 'auto',
      overscrollBehavior: 'none',
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    {storyFn()}
  </div>
)
