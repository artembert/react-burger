declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>;
      login(login?: string, password?: string): void;
      closeModal(): void;
      createBurger(): void;
    }
  }
}

export {};
