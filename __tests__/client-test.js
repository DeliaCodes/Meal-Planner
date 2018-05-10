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
  daysFromCurrentDay,
  iterateOverDays,
  convertNumberToWeekDay,
  renderSchedule,
  scheduleTemplate,
  accessEachDaysMealsInOrder,
  convertWeekDayToNumber,
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
      // const result;
      expect(result.status).toBe(200);
      expect(result.body).toContain(input);
    });
  });

  it('meal template returns - template function', () => {
    expect(template({
        name: 'macaroni',
        description: 'macaroni, salt, and water',
      }),).toContain('macaroni');
  });

  it('schedule template returns ok', () => {
    expect(scheduleTemplate({
        dayOfWeek: 0,
        name: 'Fish',
      }),).toContain('Fish');
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

  /*   it('mappingMeals is correct - mappingMealsIntoTemplate function', () => {
      const data = [{
        name: 'macaroni',
        description: 'macaroni, pepper, salt, and water',
      }];

      const result = mappingMealsIntoTemplate(data);

      expect(result).toContain('macaroni');
    });
   */
  /* it('mappingIntoScheduleTemplate is correct', () => {
    const data = [{
      day: '3',
      meal: ['Gestae'],
    },
    {
      day: '5',
      meal: ['Res'],
    },
    ];

    const result = mappingScheduleTemplate(data);
    expect(result).toContain('Wed');
  }); */
  /*
    it('unrolls the schedule meals', () => {
      const data = ['coal'];
      const result = unrollingPerDayMeals(data);
      expect(result).toContain('coal');
    }); */

  it('It renders - render function', () => {
    document.body.innerHTML = '<div><div id="currentMeals"/></div>';
    const duck = {
      meals: [
        {
          name: 'ravioli',
          description: 'ravioli, salt, and water',
        },
      ],
    };

    render(duck);

    expect($('#currentMeals').html()).toContain('ravioli');
  });

  it('renders Schedule test', () => {
    document.body.innerHTML = '<div><div id="schedule"/></div>';
    const meals = {
      Sun: ['Thing', 'other thing'],
      Wed: ['Gestae'],
      Fri: ['Res'],
    };

    renderSchedule(meals);

    expect($('#schedule').html()).toContain('Gestae');
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
      meals: [
        {
          name: 'macaroni',
          description: 'macaroni, cayenne, salt, and water',
        },
      ],
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
      Sun: [
        {
          dayOfWeek: '0',
          description: 'Thing',
          name: 'other thing',
        },
      ],
      Wed: [
        {
          dayOfWeek: '0',
          description: 'Gestae',
          name: 'Res',
        },
      ],
      Fri: [
        {
          dayOfWeek: '0',
          description: 'etc',
          name: 'Ibid',
        },
      ],
    };

    const result = ['Fri', 'Sun', 'Wed'];

    expect(daysFromCurrentDay(mealsOfWeek, 5)).toEqual(result);
  });
  it('Accesses each days meals', () => {
    const mealsOfWeek = {
      Sun: [
        {
          dayOfWeek: '0',
          description: 'Thing',
          name: 'other thing',
        },
      ],
      Wed: [
        {
          dayOfWeek: '0',
          description: 'Gestae',
          name: 'Res',
        },
      ],
      Fri: [
        {
          dayOfWeek: '0',
          description: 'etc',
          name: 'Ibid',
        },
      ],
    };
    const result = [
      {
        dayOfWeek: '0',
        description: 'etc',
        name: 'Ibid',
      },
    ];

    const week = ['Fri', 'Sun', 'Wed'];
    expect(accessEachDaysMealsInOrder(week, mealsOfWeek)).toContainEqual(result,);
  });

  it('serves up each days meals', () => {
    const weeksMeals = [
      [
        {
          dayOfWeek: '0',
          description: 'etc',
          name: 'Ibid',
        },
      ],
      [
        {
          dayOfWeek: '0',
          description: 'Thing',
          name: 'other thing',
        },
      ],
      [
        {
          dayOfWeek: '0',
          description: 'Gestae',
          name: 'Res',
        },
      ],
    ];

    const result = [
      {
        dayOfWeek: '0',
        description: 'Gestae',
        name: 'Res',
      },
    ];

    expect(iterateOverDays(weeksMeals)).toContainEqual(result);
  });
});
