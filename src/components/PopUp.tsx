import { Html } from "@react-three/drei";
import React from "react";
import GlassButton from "./GlassButton"; // Import the reusable button

const PopUp = ({ title, description, href, github }: { title: string; description: string; href?: string; github?: string }) => {
  return (
    <Html position={[0, 1, 0]} center>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.3)", // Frosted glass effect
          padding: "20px",
          borderRadius: "12px",
          color: "#f8f9fa",
          textAlign: "center",
          width: "500px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", // Safari support
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        }}
      >

        <style>
          {`
            a {
              display: inline-block;
              text-decoration: none;
              color: rgba(255, 30, 30, 0.5);
              font-weight: bold;
            }
          `}
        </style>

        <h3 style={{ margin: "0 0 10px", color: "#ffffff", fontWeight: "bold" }}>{title}</h3>
        <p style={{ fontSize: "18px", color: "#f8f9fa", marginBottom: "15px" }}
          dangerouslySetInnerHTML={{ __html: description }}>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {href && <GlassButton text="Visit Website" href={href} bgColor="rgba(255, 255, 255, 0.2)" />}
          {github && <GlassButton text="Visit Repo" href={github} bgColor="rgba(30, 144, 255, 0.5)" />}
        </div>
      </div>
    </Html>
  );
};

export default PopUp;
