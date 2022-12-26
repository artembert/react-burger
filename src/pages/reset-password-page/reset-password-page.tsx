import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { InputPasswordType } from "../../types";
import { NBSP } from "../../components/costants";
import styles from "./reset-password-page.module.css";

export const ResetPasswordPage = () => {
  const [value, setValue] = useState({
    confirmationCode: "",
    password: "",
  });
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
        title="Восстановление пароля"
        footer={
          <>
            <div>
              <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
              {NBSP}
              <Link to="/login">
                <TextLink>Войти</TextLink>
              </Link>
            </div>
          </>
        }
      >
        <Input
          type={inputPasswordType}
          placeholder="Введите новый пароль"
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
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleFieldChange}
          value={value.confirmationCode}
          autoComplete="off"
          name="confirmation-code"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
