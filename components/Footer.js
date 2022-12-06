import Image from "next/image";

const Footer = () => {
  const image =
    "https://s2.coinmarketcap.com/static/cloud/img/newsletter_bg_dark.svg?_=43586d2";

  return (
    <div className="footer-wrapper">
      <div className="section-one">
        <div className="subscribe">
          <p className="title">
            Be the first to know about{" "}
            <span style={{ fontWeight: "700" }}>crypto news every day</span>
          </p>
          <p className="description">
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don't miss a single newsletter.
          </p>
          <button className="subscribe-button">Subscribe now</button>
        </div>
        <div>
          <img src={image} alt="image" />
        </div>
      </div>
      <div className="section-two">
        <div className="coinmarketcap-section">
          <div>
            <Image
              priority="preload"
              alt="icon"
              src="/coinmarketcap.svg"
              width={190}
              height={190}
            />
          </div>
        </div>
        <div className="links-section">
          <div className="product">
            <span>Product</span>
            <ul>
              <li>
                <a href="">Blockchain Explorer</a>
              </li>
              <li>
                <a href="">Crypto API</a>
              </li>
              <li>
                <a href="">Crypto Indices</a>
              </li>
              <li>
                <a href="">Jobs Board</a>
              </li>
              <li>
                <a href="">Sitemap</a>
              </li>
            </ul>
          </div>
          <div className="company">
            <span>Company</span>
            <ul>
              <li>
                <a href="">About us</a>
              </li>
              <li>
                <a href="">Terms of use</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="">Community Rules</a>
              </li>
              <li>
                <a href="">Disclaimer</a>
              </li>
              <li>
                <a href="">Methodology</a>
              </li>
              <li>
                <a href="">Careers</a>
                <span
                  style={{
                    fontSize: "11px",
                    backgroundColor: "rgb(56, 97, 251)",
                    padding: "4px 12px",
                    borderRadius: "40px",
                    marginInlineStart: "5px",
                  }}
                >
                  We're hiring!
                </span>
              </li>
            </ul>
          </div>
          <div className="support">
            <span>Support</span>
            <ul>
              <li>
                <a href="">Request Form</a>
              </li>
              <li>
                <a href="">Contact Support</a>
              </li>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">Glossary</a>
              </li>
            </ul>
          </div>
          <div className="socials">
            <span>Socials</span>
            <ul>
              <li>
                <a href="">Facebook</a>
              </li>
              <li>
                <a href="">Twitter</a>
              </li>
              <li>
                <a href="">Telegram</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">Intractive Chat</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "rgb(160, 160, 160)",
          }}
        >
          © 2022 CoinMarketCap. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
