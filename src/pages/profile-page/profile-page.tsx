import { ChangeEvent, RefObject, useCallback, useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfilePageWrapper } from "../../components/profile-page-wrapper/profile-page-wrapper";
import { FormWrapper } from "../../components/form-wrapper/form-wrapper";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { InputPasswordType } from "../../types";
import styles from "./profile-page.module.css";

type FieldName = "name" | "email" | "password";

const editableFieldsInitial = {
  name: false,
  email: false,
  password: false,
};

export const ProfilePage = () => {
  const [value, setValue] = useState<Record<FieldName, string>>({
    name: "Alex Fincher",
    email: "alex-fincher@yahoo.com",
    password: "jjfsef$%^&(!3^sdfsf",
  });
  const [editable, setEditable] = useState<Record<FieldName, boolean>>({
    ...editableFieldsInitial,
  });
  const refs: Record<FieldName, RefObject<HTMLInputElement>> = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };
  const [fieldsHasBeenChanged, setFieldsHasBeenChanged] = useState<boolean>(false);

  const [inputPasswordType, setInputPasswordType] = useState<InputPasswordType>("password");
  const onEditIconClick = (fieldName: FieldName) => () => {
    const isCurrentFieldEditable = editable[fieldName];
    if (isCurrentFieldEditable) {
      setEditable({
        ...editableFieldsInitial,
        [fieldName]: false,
      });
    } else {
      setEditable({
        ...editableFieldsInitial,
        [fieldName]: true,
      });
    }
    if (fieldName === "password" && !isCurrentFieldEditable) {
      setInputPasswordType("text");
    } else {
      setInputPasswordType("password");
    }
    setTimeout(() => refs[fieldName].current?.focus(), 0);
  };
  const handleFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFieldsHasBeenChanged(true);
    setValue((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <ProfilePageWrapper
      pageDescription={"В этом разделе вы можете изменить свои персональные данные"}
      navigation={<ProfileNavigation />}
      content={
        <div className="mt-30">
          <FormWrapper>
            <Input
              type="text"
              placeholder="Имя"
              onChange={handleFieldChange}
              icon={editable["name"] ? "CheckMarkIcon" : "EditIcon"}
              readOnly={!editable["name"]}
              value={value.name}
              autoComplete="full-name"
              name="name"
              error={false}
              ref={refs.name}
              onIconClick={onEditIconClick("name")}
              errorText="Ошибка"
              size="default"
            />
            <Input
              type="email"
              placeholder="E-mail"
              onChange={handleFieldChange}
              icon={editable["email"] ? "CheckMarkIcon" : "EditIcon"}
              readOnly={!editable["email"]}
              value={value.email}
              autoComplete="email"
              name="email"
              error={false}
              ref={refs.email}
              onIconClick={onEditIconClick("email")}
              errorText="Ошибка"
              size="default"
            />
            <Input
              type={inputPasswordType}
              placeholder="Пароль"
              onChange={handleFieldChange}
              icon={editable["password"] ? "CheckMarkIcon" : "EditIcon"}
              readOnly={!editable["password"]}
              value={value.password}
              name="password"
              autoComplete="new-password"
              error={false}
              ref={refs.password}
              onIconClick={onEditIconClick("password")}
              errorText="Ошибка"
              size="default"
            />
            {fieldsHasBeenChanged ? (
              <div className={styles.buttonWrapper}>
                <Button htmlType="button" type="secondary" size="medium">
                  Отменить
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            ) : null}
          </FormWrapper>
        </div>
      }
    />
  );
};
