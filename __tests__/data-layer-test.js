import mongoose from "mongoose";
import { TEST_DATABASE_URL } from "../config";

const {
  getAllMealsFromDB,
  addMealToDB,
  removeMealFromDB,
  updateMealInDB
} = require("../src/data-layer.js");

describe("Database Api works as expected", () => {
  let connection;
  beforeAll(() => {
    connection = mongoose.connect(TEST_DATABASE_URL);
    return connection;
  });
  beforeEach(() => mongoose.connection.db.dropDatabase());

  afterAll(() => mongoose.disconnect());

  test("Data is created as expected", () => {
    const input = {
      name: "Macaroni and Cheese",
      description: "Made with Love"
    };
    // expect.assertions(2);
    return addMealToDB(input).then(data => {
      expect(data).toHaveProperty("name", "Macaroni and Cheese");
      expect(data.id).toBeDefined();
    });
  });
  // eslint-disable-next-line jest/no-disabled-tests
  xtest("Data is removed as expected", () => {
    const input = {
      name: "Potatoes",
      description: "Mashed"
    };
    return addMealToDB(input).then(data =>
      removeMealFromDB(data._id).then(() => expect(Response).toBeDefined())
    );
  });
  // eslint-disable-next-line jest/no-disabled-tests
  xtest("Data is updated as expected", () => {
    const input = {
      name: "Back-lava",
      description: "Molten"
    };
    const updateToInput = {
      name: "Baclava",
      description: "Molten"
    };
    return addMealToDB(input).then(data =>
      updateMealInDB(data._id, updateToInput).then(() =>
        expect(Response).toBeDefined()
      )
    );
  });
});
