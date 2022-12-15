import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { NBSP } from "../../components/costants";
import styles from "./login-page.module.css";

type InputPasswordType = "text" | "password";

export const LoginPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [inputPasswordType, setInputPasswordType] = useState<InputPasswordType>("password");
  const onPasswordIconClick = () => {
    setInputPasswordType((current) => (current === "text" ? "password" : "text"));
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
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
        title="Вход"
        footer={
          <>
            <div>
              <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
              {NBSP}
              <Link to="/register">
                <TextLink>Зарегистрироваться</TextLink>
              </Link>
            </div>
            <div>
              <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
              {NBSP}
              <Link to="/">
                <TextLink>Восстановить пароль</TextLink>
              </Link>
            </div>
          </>
        }
      >
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
          autoComplete="password"
          error={false}
          ref={inputPasswordRef}
          onIconClick={onPasswordIconClick}
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
