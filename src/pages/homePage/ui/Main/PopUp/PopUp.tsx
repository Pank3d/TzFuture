import { useForm } from "react-hook-form";
import "./PopUp.scss";
import line3 from "../../../../../shared/icons/Line 186.png";
import submitButton from "../../../../../shared/icons/submit.png";
import InputMask from "react-input-mask";
import React, { useState } from "react";
import closeImg from "../../../../../shared/icons/Group 1321314089.png";
import { dataInter } from "../../../../../shared/type/type";
import PopUpSaved from "./PopUpSaved/PopUpSaved";

const PopUp = ({ onClick }: any) => {
  const {
    register,
    handleSubmit,
    formState: {  isValid },
    reset,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "+7",
      checkbox: false,
    },
  });

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [saved, setSaved] = useState<boolean>(true);

  const handlePhoneKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && event.currentTarget.selectionStart === 0) {
      event.preventDefault();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    if (!/^[A-Za-z]+$/.test(name)) {
      setNameError("Имя должно содержать только буквы");
    } else if (name.length < 2) {
      setNameError("Минимальная длина имени 2 символа");
    } else if (name.length > 10) {
      setNameError("Максимальная длина имени 10 символов");
    } else {
      setNameError("");
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone)) {
      setPhoneError("Неверный формат номера телефона");
    } else {
      setPhoneError("");
    }
  };

  const onSubmit = async (data: dataInter) => {
    const isValidForm = await trigger(); 
    if (isValidForm) {
      localStorage.setItem("formData", JSON.stringify(data));
      reset();
      setSaved(false)
    } else {
      console.log("Форма невалидна");
    }
  };

  const watchCheckbox = watch("checkbox"); 

  return (
    
    <div className="popup">
      {saved ? (<div className="popup_form">
        <button className="closeBtn" onClick={onClick}>
          <img src={closeImg} />
        </button>
        <h1 className="call">Закажите обратный звонок</h1>
        <div className="popFormInputs">
          <label className=" mt-6 ">
            <input
              placeholder="ИМЯ"
              type="text"
              className="name"
              {...register("name", {
                required: "Это поле обязательно",
              })}
              onChange={handleNameChange} // Добавляем обработчик изменения для поля имени
            />
            {nameError && <p className="error">{nameError}</p>}
            <img src={line3} alt="" />
          </label>
          <label className=" mt-6 ">
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              placeholder="+7 (___) ___-__-__"
              className="phone"
              {...register("phone", {
                required: "Это поле обязательно",
              })}
              onChange={handlePhoneChange} // Добавляем обработчик изменения для поля телефона
              onKeyDown={handlePhoneKeyDown}
            />
            <img src={line3} alt="" />
            {phoneError && <p className="error">{phoneError}</p>}
          </label>

          <label className="check">
            <input
              type="checkbox"
              className="SubmitForResponse"
              {...register("checkbox", { required: "Согласие обязательно" })}
            />
            <p className="checkText">
              Согласен на сохранение и обработку персональных данных
            </p>
            {!watchCheckbox && <p className="error">Вы должны согласиться</p>}
          </label>
          <button
            className="submit"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            <img src={submitButton} alt="" />
          </button>
        </div>
      </div>) : (<PopUpSaved onClick={onClick}/>)}
      
    </div>
  );
};

export default PopUp;
