import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../app/hooks/use-form";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { InputPasswordType } from "../../types";
import { NBSP } from "../../components/costants";
import { selectResetPasswordWasForget, selectResetPasswordWasReset } from "../../services/reset-password/selectors";
import { Routes } from "../../app/routes/constants";
import { fetchResetPassword } from "../../services/reset-password";
import { useAppDispatch, useAppSelector } from "../../services/store";
import styles from "./reset-password-page.module.css";

export const ResetPasswordPage = () => {
  const { formFields, handleFieldChange } = useForm({
    confirmationCode: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const wasForget = useAppSelector(selectResetPasswordWasForget);
  const wasReset = useAppSelector(selectResetPasswordWasReset);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [inputPasswordType, setInputPasswordType] = useState<InputPasswordType>("password");
  const onPasswordIconClick = () => {
    setInputPasswordType((current) => (current === "text" ? "password" : "text"));
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
  };
  const resetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(fetchResetPassword({ password: formFields.password, token: formFields.confirmationCode }));
    },
    [dispatch, formFields.password, formFields.confirmationCode]
  );

  useEffect(() => {
    if (!wasForget) {
      history.push(Routes.ForgotPassword);
    }
  }, [history, wasForget]);

  useEffect(() => {
    if (wasReset) {
      history.push(Routes.Login);
    }
  }, [history, wasReset]);

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
        onSubmit={resetPassword}
      >
        <Input
          type={inputPasswordType}
          placeholder="Введите новый пароль"
          onChange={handleFieldChange}
          icon="ShowIcon"
          value={formFields.password}
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
          value={formFields.confirmationCode}
          autoComplete="off"
          name="confirmationCode"
          error={false}
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
