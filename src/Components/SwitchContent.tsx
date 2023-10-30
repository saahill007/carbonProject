// import React, { useState } from "react";
// import "./SwitchContent.css"; // Import the CSS file for styling

// interface SwitchContentProps {
//   label: string;
//   onChange: (value: boolean) => void;
// }

// const SwitchContent: React.FC<SwitchContentProps> = ({ label, onChange }) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleSwitchChange = () => {
//     const newCheckedState = !isChecked;
//     setIsChecked(newCheckedState);
//     onChange(newCheckedState);
//   };

//   return (
//     <span
//       className="switch-content"
//       style={{ paddingLeft: "15%", paddingRight: "15%" }}
//     >
//       <p className="switchText">{label}</p>
//       <label className="switch">
//         <input
//           type="checkbox"
//           role="switch"
//           checked={isChecked}
//           onChange={handleSwitchChange}
//         />
//         <span className="slider round"></span>
//       </label>
//     </span>
//   );
// };

// export default SwitchContent;
import React, { useState, useEffect } from "react";
import "./SwitchContent.css"; // Import the CSS file for styling

interface SwitchContentProps {
  label: string;
  onChange: (value: boolean) => void;
  defaultChecked?: boolean; // Add the optional defaultChecked prop
}

const SwitchContent: React.FC<SwitchContentProps> = ({
  label,
  onChange,
  defaultChecked = false, // Set default value to false if not provided
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  // Update the state if the defaultChecked prop changes
  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleSwitchChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <span
      className="switch-content"
      style={{ paddingLeft: "15%", paddingRight: "15%" }}
    >
      <p className="switchText">{label}</p>
      <label className="switch">
        <input
          type="checkbox"
          role="switch"
          checked={isChecked}
          onChange={handleSwitchChange}
        />
        <span className="slider round"></span>
      </label>
    </span>
  );
};

export default SwitchContent;
