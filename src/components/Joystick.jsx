import React, {useState, useEffect} from "react";
import ReactNipple from 'react-nipple'
import "react-nipple/lib/styles.css";

const JoystickControls = ({ onMoveFunc }) => {
  const [isTouchscreen, setIsTouchscreen] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchscreen(isTouchDevice);
  }, []);

  if (!isTouchscreen) {
    return null; // Don't render if it's not a touchscreen device
  }
  return (
    <div style={styles.container}> 
      <ReactNipple
        options={{ 
          mode: "static", 
          position: { right: "70px", bottom: "80px" },
          size: 150,
        }}
        onMove={(event, data) => {
          if (data.direction) onMoveFunc(data.direction.angle);
        }}
        onEnd={() => onMoveFunc(null)} // Stop movement when joystick is released
      />
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    bottom: "80px",
    right: "70px",
    zIndex: 1000,
  },
};

export default JoystickControls;
