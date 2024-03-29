import { FormEvent, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../app/hooks/use-form";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { InputPasswordType } from "../../types";
import { NBSP } from "../../components/costants";
import { fetchLogin } from "../../services/auth";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectAuthLoadingState } from "../../services/auth/selectors";
import { LoadingState } from "../../types/loading-state";
import { ButtonSpinnerInsert } from "../../components/button-spinner-insert/button-spinner-insert";
import styles from "./login-page.module.css";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoadingState) === LoadingState.LOADING;
  const { formFields, handleFieldChange } = useForm({
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
  const signIn = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(fetchLogin(formFields));
    },
    [dispatch, formFields]
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
              <Link to="/forgot-password">
                <TextLink>Восстановить пароль</TextLink>
              </Link>
            </div>
          </>
        }
        onSubmit={signIn}
      >
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleFieldChange}
          value={formFields.email}
          autoComplete="email"
          name="email"
          error={false}
          ref={inputEmailRef}
          required
          errorText="Ошибка"
          size="default"
          data-testid="login-filed"
        />
        <Input
          type={inputPasswordType}
          placeholder="Пароль"
          onChange={handleFieldChange}
          icon="ShowIcon"
          value={formFields.password}
          name="password"
          autoComplete="password"
          error={false}
          ref={inputPasswordRef}
          onIconClick={onPasswordIconClick}
          required
          errorText="Ошибка"
          size="default"
          data-testid="password-filed"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading} data-testid="login-button">
            <ButtonSpinnerInsert isLoading={isLoading}>Войти</ButtonSpinnerInsert>
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
