import logo from "../../../../../../shared/icons/logo.png";
import closeImg from "../../../../../../shared/icons/Group 1321314089.png";
import "../PopUpSaved/PopUpSaved.scss";

const PopUpSaved = ({ onClick }: any) => {
  return (
    <div className="popUpSavedState">
      <button className="closeBtn" onClick={onClick}>
        <img src={closeImg} />
      </button>
      <div className="textForSaved">
        <h1>Спасибо за заявку</h1>
        <p>Я обязательно свяжусь с вами в ближайшее время.</p>
      </div>
      <img src={logo} className="logoPop" />
    </div>
  );
};

export default PopUpSaved;
