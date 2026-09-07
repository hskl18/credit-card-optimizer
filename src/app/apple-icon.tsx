import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#17150f",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <div
          style={{
            borderBottom: "10px solid #ebe6da",
            borderTop: "34px solid #ebe6da",
            borderLeft: "10px solid #ebe6da",
            borderRight: "10px solid #ebe6da",
            borderRadius: 12,
            height: 76,
            width: 116
          }}
        />
      </div>
    ),
    size
  );
}
