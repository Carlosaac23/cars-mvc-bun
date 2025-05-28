import { describe, it, expect, beforeEach, jest } from 'bun:test';
import { Car, type InfoCar } from './model';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const testFilePath = join(__dirname, 'cars.test.json');
const carInstance = new Car(testFilePath);

const testCar: InfoCar = {
  brand: 'Toyota',
  model: 'Supra',
  year: 2022,
  hp: 382,
};

const sampleCars: InfoCar[] = [
  { brand: 'Toyota', model: 'Supra', year: 2020, hp: 382 },
  { brand: 'Nissan', model: 'GT-R', year: 2019, hp: 565 },
];

beforeEach(async () => {
  // Reinicia el archivo antes de cada test
  await writeFile(testFilePath, JSON.stringify([], null, 2));
});

describe('Testeo la clase Car', () => {
  it('Debe agregar un auto correcto al archivo JSON', async () => {
    await carInstance.addCar(testCar);

    const data = await readFile(testFilePath, 'utf-8');
    const cars: InfoCar[] = JSON.parse(data);

    expect(cars).toHaveLength(1);
    expect(cars[0]).toEqual(testCar);
  });

  it('No debe agregar un auto con campos vacíos', async () => {
    const invalidCar = {
      brand: '',
      model: '',
      year: NaN,
      hp: NaN,
    } as InfoCar;

    await carInstance.addCar(invalidCar);

    const data = await readFile(testFilePath, 'utf-8');
    const cars: InfoCar[] = JSON.parse(data);

    expect(cars).toHaveLength(0);
  });
});

describe('Testeo la clase Car metodo getAllCars', () => {
  beforeEach(async () => {
    await writeFile(testFilePath, JSON.stringify(sampleCars, null, 2));
  });

  it('Debe imprimir todos los autos en la consola', async () => {
    const car = new Car(testFilePath);
    const consoleSpy = jest.fn();

    const originalConsoleLog = console.log;
    console.log = consoleSpy;

    await car.getAllCars();

    console.log = originalConsoleLog;

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock?.calls[0]?.[0]).toEqual(sampleCars);
  });
});

describe('Testeo la clase Car metodo deleteCar', () => {
  beforeEach(async () => {
    await writeFile(testFilePath, JSON.stringify(sampleCars, null, 2));
  });

  it('Debe eliminar un auto del JSON', async () => {
    const carName = 'Supra';

    await carInstance.deleteCar(carName);

    const data = await readFile(testFilePath, 'utf-8');
    const cars: InfoCar[] = JSON.parse(data);

    expect(cars).toHaveLength(1);
    expect(cars[0]?.model).not.toBe('Supra');
  });
});

describe('Testeo la clase Car metodo getCarsData', () => {
  beforeEach(async () => {
    await writeFile(testFilePath, JSON.stringify(sampleCars, null, 2));
  });

  it('Debe retornar todo el JSON', async () => {
    const car = new Car(testFilePath);

    const data = await readFile(testFilePath, 'utf-8');
    const dataCars: InfoCar[] = JSON.parse(data);

    expect(dataCars).toEqual(sampleCars);
  });
});
