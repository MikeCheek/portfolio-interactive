import React, { useEffect, useState } from "react";

const ControlsUI = () => {
  const [isTouchscreen, setIsTouchscreen] = useState<boolean>(false);

  useEffect(() => {
    // Check if the device supports touch events
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchscreen(isTouchDevice);
  }, []);

  if (isTouchscreen) {
    return null; // Don't render if it's a touchscreen device
  }

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>🕹 Controls</h4>
      <p><strong>W A S D / ⬅️ ⬆️ ⬇️ ➡️</strong> - Move</p>
      <p><strong>⇧ Shift</strong> - Run</p>
      <p><strong>␣ Space</strong> - Jump</p>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    background: "rgba(0, 0, 0, 0.4)",
    padding: "10px 15px",
    borderRadius: "8px",
    color: "#f8f9fa",
    textAlign: "left",
    width: "180px",
    fontSize: "12px",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)", // Safari support
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    margin: "0 0 5px",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "14px",
  },
} as any

export default ControlsUI;
