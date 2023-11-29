import style from "./WhatsApp.module.css"

function WhatsApp() {
  return (
    <div className="col d-flex justify-content-center">
      <a
        href="https://api.whatsapp.com/send?phone=598099434334"
        className="linkContacto d-flex align-items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={style.imagenContainer}>
          <img className={style.logo}
            src="https://onlybooksbucket.s3.amazonaws.com/whatsapp_logo.png"
            alt="WhatsApp"
          />
        </div>
        </a>
    </div>
  );
}

export default WhatsApp;
