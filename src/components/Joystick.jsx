import React, {useState, useEffect} from "react";
import ReactNipple from 'react-nipple'
import "react-nipple/lib/styles.css";

const JoystickControls = ({ onMoveFunc }) => {
  const [isTouchscreen, setIsTouchscreen] = useState(false);

  useEffect(() => {
    // Check if the device supports touch events
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchscreen(isTouchDevice);
  }, []);

  if (!isTouchscreen) {
    return null; // Don't render if it's not a touchscreen device
  }
  return (
    <div style={styles.container}> 
      <ReactNipple
        options={{ mode: "static", position: { right: "50px", bottom: "50px" }}}
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
    bottom: "50px",
    right: "50px",
    zIndex: 1000,
  },
};

export default JoystickControls;
