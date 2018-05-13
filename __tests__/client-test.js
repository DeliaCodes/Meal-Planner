/**
 * @jest-environment jsdom
 */

const $ = require('jquery');
const moment = require('moment');

moment().format();
const {
  render,
  template,
  addToState,
  getMealsFromEndpoint,
  sortWeekDays,
  iterIterDay,
  daysFromCurrentDay,
  convertNumberToWeekDay,
  renderSchedule,
  scheduleTemplate,
  accessEachDaysMealsInOrder,
  convertWeekDayToNumber,
  insertAndFlattenToHTML,
  sendMealToEndpoint,
} = require('../src/client');

jest.mock('../src/api');

describe('Client Side tests', () => {
  describe('client-side to server tests', () => {
    xit('successfully return data from meals endpoint', () => {
      const result = getMealsFromEndpoint();
      console.log('getting results', result);
      expect(result.status).toBe(200);
      expect(result.response.body).toBeDefined();
    });

    xit('adds a meal to the meals endpoint', () => {
      const input = {
        name: 'Tea',
        description: 'Tea and water',
      };
      const result = sendMealToEndpoint(input);
      expect(result.status).toBe(200);
      expect(result.body).toContain(input);
    });
  });

  it('meal template returns - template function', () => {
    expect(template({
      name: 'macaroni',
      description: 'macaroni, salt, and water',
    })).toContain('macaroni');
  });

  it('schedule template returns ok', () => {
    expect(scheduleTemplate({
      dayOfWeek: 0,
      name: 'Fish',
    })).toContain('Fish');
  });

  it('Returns Number when given day of week', () => {
    const data = 'Friday';
    const result = convertWeekDayToNumber(data);
    expect(result).toBe('5');
    expect(convertWeekDayToNumber('Fri')).toBe('5');
  });

  it('returns day of week when given number', () => {
    expect(convertNumberToWeekDay(3)).toBe('Wed');
  });
  it('It renders - render function', () => {
    document.body.innerHTML = '<div><div id="currentMeals"/></div>';
    const duck = {
      meals: [{
        name: 'ravioli',
        description: 'ravioli, salt, and water',
      }],
    };

    render(duck);

    expect($('#currentMeals').html()).toContain('ravioli');
  });

  it('renders Schedule test', () => {
    document.body.innerHTML = '<div><div id="displaySchedule"/></div>';
    const meals = {
      Wed: [{
        dayOfWeek: '0',
        description: 'Gestae',
        name: 'Res',
      }],
    };

    renderSchedule(meals);

    expect($('#displaySchedule').html()).toContain('Gestae');
  });

  it('modifies store - addToState function', () => {
    const appleCore = {
      name: 'macaroni',
      description: 'macaroni, cayenne, salt, and water',
    };

    const appleStore = {
      meals: [],
    };

    const appleExpected = {
      meals: [{
        name: 'macaroni',
        description: 'macaroni, cayenne, salt, and water',
      }],
    };

    const appleResult = addToState(appleStore, appleCore);

    expect(appleResult).toEqual(appleExpected);
  });

  it('Sorts array of meals correctly', () => {
    const unsortedArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const result = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];

    expect(sortWeekDays(unsortedArray, 3)).toEqual(result);
  });
  it('returns days from backend object', () => {
    const mealsOfWeek = {
      Sun: [{
        dayOfWeek: '0',
        description: 'Thing',
        name: 'other thing',
      }],
      Wed: [{
        dayOfWeek: '0',
        description: 'Gestae',
        name: 'Res',
      }],
      Fri: [{
        dayOfWeek: '0',
        description: 'etc',
        name: 'Ibid',
      }],
    };

    const result = ['Fri', 'Sun', 'Wed'];

    expect(daysFromCurrentDay(mealsOfWeek, 5)).toEqual(result);
  });
  it('Accesses each days meals', () => {
    const mealsOfWeek = {
      Sun: [{
        dayOfWeek: '0',
        description: 'Thing',
        name: 'other thing',
      }],
      Wed: [{
        dayOfWeek: '0',
        description: 'Gestae',
        name: 'Res',
      }],
      Fri: [{
        dayOfWeek: '0',
        description: 'etc',
        name: 'Ibid',
      }],
    };
    const result = [{
      dayOfWeek: '0',
      description: 'etc',
      name: 'Ibid',
    }];

    const week = ['Fri', 'Sun', 'Wed'];
    expect(accessEachDaysMealsInOrder(week, mealsOfWeek)).toContainEqual(result);
  });

  it('serves up each days meals', () => {
    const weeksMeals = [{
      dayOfWeek: '0',
      description: 'etc',
      name: 'Ibid',
    }, {
      dayOfWeek: '1',
      description: 'Thing',
      name: 'other thing',
    }];

    const result = ['<div class="meal"><p class="name">Ibid</p><p class="description">etc</p><a class="edit">Delete Meal</a></div>', '<div class="meal"><p class="name">other thing</p><p class="description">Thing</p><a class="edit">Delete Meal</a></div>'];

    expect(iterIterDay(weeksMeals)).toEqual(result);
  });
  it('flattens and returns', () => {
    const nextWeek = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
    const someMeals = [
      [{
        dayOfWeek: '5',
        description: 'etc',
        name: 'Ibid',
      }, {
        dayOfWeek: '5',
        description: 'Clipper',
        name: 'Blue Star Line',
      }],
      [],
      [{
        dayOfWeek: '0',
        description: 'Thing',
        name: 'other thing',
      }],
      [],
      [{
        dayOfWeek: '2',
        description: 'Thing',
        name: 'other thing',
      }],
      [{
        dayOfWeek: '3',
        description: 'Gestae',
        name: 'Res',
      }],
      [{
        dayOfWeek: '4',
        description: 'Thing',
        name: 'other thing',
      }],
    ];
    const result = '<h2 class="day">Fri</h2><div class="meal"><p class="name">Ibid</p><p class="description">etc</p><a class="edit">Delete Meal</a></div><div class="meal"><p class="name">Blue Star Line</p><p class="description">Clipper</p><a class="edit">Delete Meal</a></div><h2 class="day">Sat</h2><h2 class="day">Sun</h2><div class="meal"><p class="name">other thing</p><p class="description">Thing</p><a class="edit">Delete Meal</a></div><h2 class="day">Mon</h2><h2 class="day">Tue</h2><div class="meal"><p class="name">other thing</p><p class="description">Thing</p><a class="edit">Delete Meal</a></div><h2 class="day">Wed</h2><div class="meal"><p class="name">Res</p><p class="description">Gestae</p><a class="edit">Delete Meal</a></div><h2 class="day">Thu</h2><div class="meal"><p class="name">other thing</p><p class="description">Thing</p><a class="edit">Delete Meal</a></div>';

    expect(insertAndFlattenToHTML(someMeals, nextWeek)).toMatch(result);
  });
});
