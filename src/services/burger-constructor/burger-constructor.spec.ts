import {
  addIngredient,
  burgerConstructor,
  clearConstructor,
  ConstructorSliceState,
  deleteIngredientFromConstructor,
  reorderConstructorIngredients,
} from "./index";
import { ingredientsMock } from "./__fixutres__/ingredients.mock";

jest.mock("uuid", () => ({ v4: () => "uuid-v4-mock-value" }));

describe("burger-constructor reducer", () => {
  it("should return initial state", () => {
    expect(burgerConstructor(undefined, { type: undefined })).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  describe("addIngredient action", () => {
    it("should add a bun", () => {
      expect(burgerConstructor(undefined, addIngredient(ingredientsMock.bun))).toEqual({
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [],
      });
    });

    it("should add a main burger part", () => {
      const previousState: ConstructorSliceState = {
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [],
      };
      expect(burgerConstructor(previousState, addIngredient(ingredientsMock.main))).toEqual({
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [{ ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" }],
      });
    });

    it("should add a souse", () => {
      const previousState: ConstructorSliceState = {
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [{ ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" }],
      };
      expect(burgerConstructor(previousState, addIngredient(ingredientsMock.sauce))).toEqual({
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
          { ...ingredientsMock.sauce, pieceId: "uuid-v4-mock-value" },
        ],
      });
    });
  });

  describe("deleteIngredientFromConstructor action", () => {
    it("should delete a bun", () => {
      const previousState: ConstructorSliceState = {
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [{ ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" }],
      };
      expect(
        burgerConstructor(
          previousState,
          deleteIngredientFromConstructor({ ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" })
        )
      ).toEqual({
        bun: null,
        ingredients: [{ ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" }],
      });
    });

    it("should delete a main burger part by given id", () => {
      const previousState: ConstructorSliceState = {
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
          { ...ingredientsMock.sauce, pieceId: "to-delete" },
        ],
      };
      expect(
        burgerConstructor(
          previousState,
          deleteIngredientFromConstructor({ ...ingredientsMock.sauce, pieceId: "to-delete" })
        )
      ).toEqual({
        bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
        ingredients: [{ ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" }],
      });
    });
  });

  describe("reorderConstructorIngredients action", () => {
    it("should flip 0 and 1 ingredients", () => {
      const previousState: ConstructorSliceState = {
        bun: null,
        ingredients: [
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
          { ...ingredientsMock.sauce, pieceId: "souse-id" },
        ],
      };
      expect(burgerConstructor(previousState, reorderConstructorIngredients({ dragIndex: 1, hoverIndex: 0 }))).toEqual({
        bun: null,
        ingredients: [
          { ...ingredientsMock.sauce, pieceId: "souse-id" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
        ],
      });
    });

    it("should put 4th element to the 2ng position", () => {
      const previousState: ConstructorSliceState = {
        bun: null,
        ingredients: [
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-1" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-2" },
          { ...ingredientsMock.sauce, pieceId: "souse-id" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-3" },
        ],
      };
      expect(burgerConstructor(previousState, reorderConstructorIngredients({ dragIndex: 3, hoverIndex: 1 }))).toEqual({
        bun: null,
        ingredients: [
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
          { ...ingredientsMock.sauce, pieceId: "souse-id" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-1" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-2" },
          { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-3" },
        ],
      });
    });
  });

  it("should clear constructor", () => {
    const previousState: ConstructorSliceState = {
      bun: { ...ingredientsMock.bun, pieceId: "uuid-v4-mock-value" },
      ingredients: [
        { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value" },
        { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-1" },
        { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-2" },
        { ...ingredientsMock.sauce, pieceId: "souse-id" },
        { ...ingredientsMock.main, pieceId: "uuid-v4-mock-value-3" },
      ],
    };
    expect(burgerConstructor(previousState, clearConstructor())).toEqual({
      bun: null,
      ingredients: [],
    });
  });
});
