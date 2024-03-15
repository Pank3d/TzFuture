import line from "../../../../shared/icons/Line1.png";
import line1 from "../../../../shared/icons/Line1.png";
import "../Main/main.scss";
import buttonWhite from "../../../../shared/icons/butter white.jpg";
import buttonBlack from "../../../../shared/icons/button other.png";
import { useEffect, useState } from "react";
import { getInfo } from "../../../../shared/api/api";
import { Data } from "../../../../shared/type/type";
import Mentor from "../../../../shared/icons/mentor 2.png";
import PopUp from "./PopUp/PopUp";

const Main = () => {
  const [data, setData] = useState<Data>();
  const [GBP, setGBP] = useState<number>();
  const [dateForMain, setDateForMain] = useState<number>();
  const [pop, setPop] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfo();
        setData(response);

        if ("GBP" in response?.Valute) {
          setGBP(response.Valute["GBP"].Value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  useEffect(() => {
    const originalDate = data?.Date;
    if (originalDate !== undefined) {
      const formattedDate = originalDate
        .slice(0, 10)
        .split("")
        .map((char) => char.toString());
      const dateSum = (date: string[]) => {
        const numericDate = date.map((i) => parseInt(i, 10));

        const filteredNumericDate = numericDate.filter((i) => !isNaN(i));

        const sum = filteredNumericDate.reduce((acc, curr) => acc + curr, 0);

        return sum;
      };
      setDateForMain(dateSum(formattedDate));
    }
  }, [data]);

  return (
    <main className="main">
      {!pop ? (
        <>
          <PopUp />
        </>
      ) : (
        <></>
      )}
      <div className="konsul">
        <h1 className="nadpis_0">Создаю условия для вашего успеха</h1>
        <div className="nadpis_1">
          <img src={line} />
          <p>
            Когда ваше время и энергия лучше сфокусированы, стремление к новым
            возможностям становится реальностью, ваш успех зависит от ваших
            действий
          </p>
        </div>
        <div className="buttons_container">
          <button className="white">
            <img src={buttonWhite} />
          </button>
          <button className="black" onClick={() => setPop(!pop)}>
            <img src={buttonBlack}  />
          </button>
        </div>
        <div className="containerForStatic">
          <div className="techick">
            <img src={line1} alt="" className="line" />
            <div className="tech_item">
              <p className="date">{dateForMain}+</p>
              <p>техник для достижения целей</p>
            </div>
          </div>
          <div className="GPB">
            <img src={line1} className="line" />
            <div className="GPB_item">
              <p className="ceilGBP">
                {typeof GBP !== "undefined"
                  ? Math.ceil(GBP)
                  : "GBP is undefined"}
                %
              </p>
              <p>увеличение личной продуктивности</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mentor">
        <img src={Mentor} />
      </div>
    </main>
  );
};

export default Main;
