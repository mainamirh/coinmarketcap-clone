import Image from "next/image";
import RightArrow from "../assets/svg/rightArrow";
import Rate from "../components/Rate";

const TrendingCard = ({ coins, title, titleIcon }) => {
  return (
    <div className="card">
      <div className="card-title">
        <div style={{ display: "flex", alignItems: "align-center" }}>
          <Image alt="icon" src={titleIcon} height={23} width={23} />
          &nbsp;&nbsp;
          <span style={{ fontSize: "17px", fontWeight: "700" }}>{title}</span>
        </div>
        <div style={{ color: "rgb(97, 136, 255)", fontSize: "13px" }} href="#">
          <span style={{ marginRight: "4px" }}>More</span>
          <RightArrow />
        </div>
      </div>
      <div className="">
        {coins.map((coin, index) => {
          return (
            <div key={index} className="row">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{ marginRight: "20px", color: "rgb(133, 140, 162)" }}
                  className="number"
                >
                  {index + 1}
                </span>
                <Image alt="icon" src={coin.icon} width={19} height={19} />
                <span style={{ marginLeft: "20px" }} className="">
                  {coin.name}{" "}
                  <span
                    style={{ marginLeft: "10px", color: "rgb(133, 140, 162)" }}
                  >
                    {coin.symbol}
                  </span>
                </span>
              </div>

              <Rate rate={coin.rate} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingCard;
