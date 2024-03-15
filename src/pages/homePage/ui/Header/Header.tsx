import "./header.scss";
import logo from "/home/maxim/tzforFuture/tz/src/shared/icons/logo.png";
import phone from "/home/maxim/tzforFuture/tz/src/shared/icons/phone.png";

const Header = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <img src={logo} className="logo" />
        <ul className="nav_list">
          <li className="nav_list_item">Обо мне</li>
          <li className="nav_list_item">Наставничество</li>
          <li className="nav_list_item">Мероприятия</li>
          <li className="nav_list_item">Кейсы</li>
          <li className="nav_list_item">Отзывы</li>
          <li className="nav_list_item">Контакты</li>
        </ul>
        <div className="phone">
          <img src={phone} alt="" />
          <p>8-345-123-34-45</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
