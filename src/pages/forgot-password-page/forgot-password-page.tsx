import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { NBSP } from "../../components/costants";
import styles from "./forgot-password-page.module.css";

export const ForgotPasswordPage = () => {
  const [value, setValue] = useState({
    email: "",
  });
  const inputEmailRef = useRef<HTMLInputElement>(null);
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
          type="email"
          placeholder="Укажите e-mail"
          onChange={handleFieldChange}
          value={value.email}
          autoComplete="email"
          name="email"
          error={false}
          ref={inputEmailRef}
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
