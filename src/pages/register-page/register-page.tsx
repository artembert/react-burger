import { FormEvent, useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../app/hooks/use-form";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { NBSP } from "../../components/costants";
import { InputPasswordType } from "../../types";
import { useAppDispatch } from "../../services/store";
import { fetchRegister } from "../../services/auth";
import { selectAuthLoadingState } from "../../services/auth/selectors";
import { LoadingState } from "../../types/loading-state";
import { ButtonSpinnerInsert } from "../../components/button-spinner-insert/button-spinner-insert";
import styles from "./register-page.module.css";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoadingState) === LoadingState.LOADING;
  const { formFields, handleFieldChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [inputPasswordType, setInputPasswordType] = useState<InputPasswordType>("password");
  const onPasswordIconClick = () => {
    setInputPasswordType((current) => (current === "text" ? "password" : "text"));
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
  };
  const register = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(fetchRegister(formFields));
    },
    [dispatch, formFields]
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
        onSubmit={register}
      >
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleFieldChange}
          value={formFields.name}
          autoComplete="full-name"
          name="name"
          error={false}
          ref={inputNameRef}
          required
          errorText="Ошибка"
          size="default"
        />
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
        />
        <Input
          type={inputPasswordType}
          placeholder="Пароль"
          onChange={handleFieldChange}
          icon="ShowIcon"
          value={formFields.password}
          name="password"
          autoComplete="new-password"
          error={false}
          ref={inputPasswordRef}
          onIconClick={onPasswordIconClick}
          required
          errorText="Ошибка"
          size="default"
        />
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            <ButtonSpinnerInsert isLoading={isLoading}>Зарегистрироваться</ButtonSpinnerInsert>
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
