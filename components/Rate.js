import ChevronUp from "../assets/svg/chevronUp";
import ChevronDown from "../assets/svg/chevronDown";

const Rate = ({ rate }) => {
  const color = rate > 0 ? "#16C784" : "#EA3943";
  return (
    <div
      style={{
        display: "inline-flex",
      }}
    >
      <div style={{ marginRight: "2px" }}>
        {rate > 0 ? <ChevronUp fill={color} /> : <ChevronDown fill={color} />}
      </div>
      <div style={{ color: color }}>{rate}%</div>
    </div>
  );
};

export default Rate;
