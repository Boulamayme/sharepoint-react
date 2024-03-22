/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";

const iconFacebook = require("../assets/facebook.svg");
const iconX = require("../assets/facebook.svg");
const iconLinkedin = require("../assets/x.svg");
const iconYoutube = require("../assets/youtube.svg");

const Footer = (): JSX.Element => {
  return (
    <>
      <div className="dx-footer">
        <div className="dx-footer-container">
          <div className="dx-footer-content">
            <div>
              <img
                loading="lazy"
                srcSet="/sites/enoe-energie/SiteAssets/assets/image_4.png"
                className="dx-footer--logo"
              />
            </div>
            <div className="dx-footer--list">
              <div className="dx-footer--title">Menu principal</div>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie">
                  Accueil
                </a>
              </span>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Actualit%C3%A9s.aspx">
                  Actualités
                </a>
              </span>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Annuaire.aspx">
                  Organisation
                </a>
              </span>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoedocs">
                  Espace documentaire
                </a>
              </span>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Eno%C3%A9.aspx">
                  Enoé
                </a>
              </span>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/Vie-d%27entreprise.aspx">
                  Vie d'entreprise
                </a>
              </span>
            </div>
            <div className="dx-footer--list">
              <div className="dx-footer--title">Aide</div>
              <span className="dx-footer--item dx-cursor">
                <a href="https://enoeenergie.sharepoint.com/sites/enoe-energie/SitePages/FAQ.aspx">
                  FAQ
                </a>
              </span>
            </div>
            <div>
              <div className="dx-footer--title">SUIVEZ-NOUS</div>
              <div className="dx-footer--socials">
                <a href="https://www.linkedin.com/company/eno%C3%A9-%C3%A9nergie/">
                  <img loading="lazy" src={iconLinkedin} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100089075965133">
                  <img loading="lazy" src={iconFacebook} />
                </a>
                <a href="https://twitter.com/enoeenergie">
                  <img loading="lazy" src={iconX} />
                </a>
                <a href="https://www.youtube.com/@enoe-energie/featured">
                  <img loading="lazy" src={iconYoutube} />
                </a>
              </div>
            </div>
          </div>
          <div className="dx-footer-divider" />
          <div className="dx-footer--copyright">
            © Copyright {new Date().getFullYear()}, Tous droits réservés - enoé
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
