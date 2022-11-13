import Image from "next/image";

import Comment from "../assets/svg/comment";
import Heart from "../assets/svg/heart";
import MoreHorizontal from "../assets/svg/moreHorizontal";
import Share from "../assets/svg/share";
import shiba from "../assets/shiba.png";
import diamond from "../assets/diamond.png";
import ChevronUp from "../assets/svg/chevronUp";
import ChevronDown from "../assets/svg/chevronDown";

const ChatCard = ({
  name = "Amir",
  username = "mainamirh",
  bullish = true,
}) => {
  return (
    <div className="chat-wrapper">
      <div className="sender-info">
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image alt="" src={shiba} width={50} height={50} />
              <div>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>{name}</span>
                    &nbsp;
                    <span
                      style={{
                        fontSize: "15px",
                        color: "rgb(56, 97, 251)",
                      }}
                      className="material-symbols-rounded"
                    >
                      verified
                    </span>
                    &nbsp;&nbsp;
                    <span
                      style={{ color: "rgb(133, 140, 162)", fontSize: "12px" }}
                    >
                      &#183; Oct 25
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: "rgb(133, 140, 162)",
                    fontSize: "12px",
                    marginTop: "3px",
                  }}
                >
                  &#64;{username}
                </p>
              </div>
            </div>
            <label
              style={{
                marginRight: "10px",
                color: "white",
                backgroundColor: bullish ? "#16C784" : "#EA3943",
                border: bullish ? "solid 1px #16C784" : "solid 1px #EA3943",
              }}
              className="bullish"
            >
              {bullish ? (
                <ChevronUp fill={"white"} />
              ) : (
                <ChevronDown fill={"white"} />
              )}
              <span style={{ marginLeft: "5px" }}>
                {bullish ? "Bullish" : "Bearish"}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="message">shogdohidhpdohdfphgdfohoh </div>
      <div className="chat-footer">
        <div>
          <Comment />
          <p>2.0K</p>
        </div>
        <div>
          <Share />
          <p>377</p>
        </div>
        <div>
          <Heart />
          <p>2.8K</p>
        </div>
        <MoreHorizontal />
      </div>
    </div>
  );
};

export default ChatCard;
