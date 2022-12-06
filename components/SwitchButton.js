const SwitchButton = ({ checked, setChecked }) => {
  return (
    <div className="toggle-button">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked ? true : false}
          onChange={setChecked}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SwitchButton;
