import { useForm } from "react-hook-form";
import "./PopUp.scss";
import line3 from "../../../../../shared/icons/Line 186.png";
import submitButton from "../../../../../shared/icons/submit.png";
import InputMask from "react-input-mask";

const PopUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const handlePhoneKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && event.currentTarget.selectionStart === 0) {
      event.preventDefault();
    }
  };

  const onSubmit = async (data: any) => {
    const isValidForm = await trigger(); // Запускаем проверку валидации
    if (isValidForm) {
      console.log("нажата");
      console.log(data);
      reset(); 
    } else {
      console.log("Форма невалидна");
    }
  };

  const watchCheckbox = watch("checkbox"); // Получаем значение чекбокса

  return (
    <div className="popup">
      <div className="popup_form">
        <h1 className="call">Закажите обратный звонок</h1>
        <div className="popFormInputs">
          <label className=" mt-6 ">
            <input
              placeholder="ИМЯ"
              type="text"
              className="name"
              {...register("name", {
                required: "Это поле обязательно",
                min: 2,
                max: 10,
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Имя должно содержать только буквы",
                },
              })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
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
                minLength: 18,
              })}
              onKeyDown={handlePhoneKeyDown} // Добавляем обработчик событий для поля телефона
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
            <img src={line3} alt="" />
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
          <button className="submit" onClick={handleSubmit(onSubmit)}>
            <img src={submitButton} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
