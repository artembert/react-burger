import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { NBSP } from "../../components/costants";
import { InputPasswordType } from "../../types";
import styles from "./register-page.module.css";

export const RegisterPage = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputPasswordRepeatRef = useRef<HTMLInputElement>(null);
  const [inputPasswordType, setInputPasswordType] = useState<InputPasswordType>("password");
  const [inputPasswordRepeatType, setInputPasswordRepeatType] = useState<InputPasswordType>("password");
  const onPasswordIconClick = () => {
    setInputPasswordType((current) => (current === "text" ? "password" : "text"));
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
  };
  const onPasswordRepeatIconClick = () => {
    setInputPasswordRepeatType((current) => (current === "text" ? "password" : "text"));
    setTimeout(() => inputPasswordRepeatRef.current?.focus(), 0);
  };
  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue((current) => ({
        ...current,
        [e.target.name]: e.target.value,
      }));
    },

    []
  );
  return (
    <FormPageWrapper>
      <FormWrapper
        title="Регистрация"
        footer={
          <>
            <div>
              <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
              {NBSP}
              <Link to="/login">
                <TextLink>Войти</TextLink>
              </Link>
            </div>
          </>
        }
      >
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleFieldChange}
          value={value.name}
          autoComplete="full-name"
          name="name"
          error={false}
          ref={inputNameRef}
          errorText="Ошибка"
          size="default"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleFieldChange}
          value={value.email}
          autoComplete="email"
          name="email"
          error={false}
          ref={inputEmailRef}
          errorText="Ошибка"
          size="default"
        />
        <Input
          type={inputPasswordType}
          placeholder="Пароль"
          onChange={handleFieldChange}
          icon="ShowIcon"
          value={value.password}
          name="password"
          autoComplete="new-password"
          error={false}
          ref={inputPasswordRef}
          onIconClick={onPasswordIconClick}
          errorText="Ошибка"
          size="default"
        />
        <Input
          type={inputPasswordRepeatType}
          placeholder="Повтор пароля"
          onChange={handleFieldChange}
          icon="ShowIcon"
          value={value.passwordRepeat}
          name="passwordRepeat"
          error={false}
          ref={inputPasswordRepeatRef}
          onIconClick={onPasswordRepeatIconClick}
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
