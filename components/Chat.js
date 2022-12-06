import { useState } from "react";
import Image from "next/image";
import ChatCard from "./ChatCard";

import ChevronUp from "../assets/svg/chevronUp";
import ChevronDown from "../assets/svg/chevronDown";
import shiba from "../assets/shiba.png";

const Chat = ({
  symbol,
  name,
  fullName = "Amir Nikan",
  username = "mainamirh",
}) => {
  const [bullish, setBullish] = useState(true);

  return (
    <div className="chat-container">
      <div className="send-post">
        <div className="title">
          <p>Live {name} Chat</p>
          <p style={{ color: "#5680fd" }}>See more</p>
        </div>
        <div className="username">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image alt="" src={shiba} width={50} height={50} />
            <div>
              <p>{fullName}</p>
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
          <div>
            <button
              onClick={() => setBullish(true)}
              style={{
                marginRight: "10px",
                color: bullish ? "white" : "#16C784",
                backgroundColor: bullish ? "#16C784" : "transparent",
                border: "solid 1px #16C784",
              }}
              className="bullish"
            >
              <ChevronUp fill={bullish ? "white" : "#16C784"} />
              <span style={{ marginLeft: "5px" }}>Bullish</span>
            </button>
            <button
              onClick={() => setBullish(false)}
              style={{
                color: bullish ? "#EA3943" : "white",
                backgroundColor: bullish ? "transparent" : "#EA3943",
                border: "solid 1px #EA3943",
              }}
              className="bearish"
            >
              <ChevronDown fill={bullish ? "#EA3943" : "white"} />
              <span style={{ marginLeft: "5px" }}>Bearish</span>
            </button>
          </div>
        </div>
        <div className="message-box">
          <input
            className="text-box"
            type="text"
            placeholder={`What's happening on ${symbol}?`}
          />
          <button className="post">Post</button>
        </div>
      </div>
      <div className="chats-wrapper">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  );
};

export default Chat;
