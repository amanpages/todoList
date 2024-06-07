import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
