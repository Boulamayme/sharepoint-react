import * as React from "react";

const Footer = (): JSX.Element => {
  return (
    <>
      <div className="dx-footer">
        <div className="dx-footer-container">
          <div className="dx-footer-content">
            <div>
              <img
                loading="lazy"
                srcSet="https://dexterousplace.sharepoint.com/sites/enoe-energie/SiteAssets/assets/image_4.png"
                className="dx-footer--logo"
              />
            </div>
            <div className="dx-footer--list">
              <div className="dx-footer--title">Menu principal</div>
              <span className="dx-footer--item">Accueil</span>
              <span className="dx-footer--item">Actualités</span>
              <span className="dx-footer--item">Organisation</span>
              <span className="dx-footer--item">Espace documentaire</span>
              <span className="dx-footer--item">Enoé</span>
              <span className="dx-footer--item">Vie d’entreprise</span>
            </div>
            <div className="dx-footer--list">
              <div className="dx-footer--title">Aide</div>
              <span className="dx-footer--item">FAQ</span>
              <span className="dx-footer--item">Plan du site</span>
              <span className="dx-footer--item">Accessibilité</span>
              <span className="dx-footer--item">Mentions légales</span>
              <span className="dx-footer--item">Protection des données</span>
            </div>
            <div>
              <div className="dx-footer--title">SUIVEZ-NOUS</div>
              <div className="dx-footer--socials">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/714685bdc44812713d0c254931750ce381aba9d454b65d665f42c006ef2487fe?"
                  className="img-2"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d907b78e050c8eb2f610a79dbe08489d44a4289ae370c134db6ace4c22b7e6ec?"
                  className="img-3"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09ee2f4dd80e6dcf4e360b5ee375dc7de5568b35d0bd51e40aea70c660081b84?"
                  className="img-4"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb4eef0f54cbb5a29a281529fa8edc93de277bdab7e0d96736e6754661d34344?"
                  className="img-5"
                />
              </div>
            </div>
          </div>
          <div className="dx-footer-divider" />
          <div className="dx-footer--copyright">
            © Copyright 2023, Tous droits réservés - enoé
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
