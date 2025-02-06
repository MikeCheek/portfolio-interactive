import React from "react";

const GlassButton = ({ text, href, bgColor }: { text: string; href: string; bgColor: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#fff",
        background: bgColor,
        border: `1px solid ${bgColor}`,
        fontSize: "16px",
        transition: "background 0.3s ease, transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = bgColor)}
    >
      {text}
    </a>
  );
};

export default GlassButton;
