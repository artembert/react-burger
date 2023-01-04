import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { TextLink } from "../../components/text-link/text-link";
import { FormPageWrapper } from "../../components/form-page-wrapper/form-page-wrapper";
import { useAppDispatch } from "../../services/store";
import { clearWasPasswordReset, fetchForgetPassword } from "../../services/reset-password";
import { NBSP } from "../../components/costants";
import styles from "./forgot-password-page.module.css";
import { useSelector } from "react-redux";
import { selectResetPasswordLoadingState, selectResetPasswordWasForget } from "../../services/reset-password/selectors";
import { LoadingState } from "../../types/loading-state";
import { Routes } from "../../app/routes/constants";
import { ButtonSpinnerInsert } from "../../components/button-spinner-insert/button-spinner-insert";

export const ForgotPasswordPage = () => {
  const [formFields, setFormFields] = useState({
    email: "",
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectResetPasswordLoadingState) === LoadingState.LOADING;
  const wasForget = useSelector(selectResetPasswordWasForget);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const handleFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormFields((current) => ({
        ...current,
        [e.target.name]: e.target.value,
      }));
    },

    []
  );
  const forgetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(fetchForgetPassword(formFields));
    },
    [dispatch, formFields]
  );
  useEffect(() => {
    dispatch(clearWasPasswordReset());
  }, [dispatch]);

  useEffect(() => {
    if (wasForget) {
      history.push(Routes.ResetPassword);
    }
  }, [history, wasForget]);

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
        onSubmit={forgetPassword}
      >
        <Input
          type="email"
          placeholder="Укажите e-mail"
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
        <div className={styles.buttonWrapper}>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            <ButtonSpinnerInsert isLoading={isLoading}>Восстановить</ButtonSpinnerInsert>
          </Button>
        </div>
      </FormWrapper>
    </FormPageWrapper>
  );
};
