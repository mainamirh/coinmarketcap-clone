const SwitchButton = () => {
  return (
    <div className="toggle-button">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SwitchButton;
