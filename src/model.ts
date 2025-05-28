import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export interface InfoCar {
  brand: string;
  model: string;
  year: number;
  hp: number;
}

class Car {
  constructor(private filePath: string = join(__dirname, 'cars.json')) {}

  private async getCarsData(): Promise<InfoCar[]> {
    const dataJSON = await readFile(this.filePath, 'utf-8');
    return JSON.parse(dataJSON);
  }

  async getAllCars(): Promise<void> {
    try {
      const dataJSON = await readFile(this.filePath, 'utf-8');
      const data = JSON.parse(dataJSON);
      return console.log(data);
    } catch (error) {
      console.error('Algo ha salido mal al leer el archivo:', error);
    }
  }

  async getCarWithMoreHP(): Promise<void> {
    try {
      const cars = await this.getCarsData();

      if (cars.length === 0) {
        return console.log('No hay autos en la base de datos');
      }

      const moreHP = cars.reduce((carOne, carTwo) => (carOne.hp > carTwo.hp ? carOne : carTwo));
      console.log(`El carro con más caballos de fuerzas es el ${moreHP.model} con ${moreHP.hp} caballos de fuerza.`);
    } catch (error) {
      console.error('Algo ha salido mal al leer el archivo:', error);
    }
  }

  async addCar(newCar: InfoCar): Promise<void> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      const cars: InfoCar[] = JSON.parse(data);
      const errores: string[] = [];
      const carExists = cars.some(car => car.model.toLowerCase() === newCar.model.toLowerCase());

      if (carExists) {
        return console.log('Ese auto ya existe en la base de datos');
      }

      if (!newCar || typeof newCar !== 'object') {
        return console.error('El objeto del auto no es válido');
      }

      if (typeof newCar.brand !== 'string' || newCar.brand.trim() === '') {
        errores.push('brand');
      }
      if (typeof newCar.model !== 'string' || newCar.model.trim() === '') {
        errores.push('model');
      }
      if (typeof newCar.hp !== 'number' || isNaN(newCar.hp)) {
        errores.push('hp');
      }
      if (typeof newCar.year !== 'number' || isNaN(newCar.year)) {
        errores.push('year');
      }

      if (errores.length > 0) {
        return console.error(`Tienes un problema en la creación de tu auto! ${errores.length > 1 ? 'Te faltan' : 'Te falta'}: ${errores.join(', ')}`);
      }

      cars.push(newCar);

      await writeFile(this.filePath, JSON.stringify(cars, null, 2));
      console.log(`El ${newCar.model} ha sido agregado exitosamente!`);
    } catch (error) {
      console.error('Algo ha salido mal al leer el archivo:', error);
    }
  }

  async deleteCar(carName: string): Promise<void> {
    try {
      const data = await readFile(this.filePath, 'utf8');
      const cars: InfoCar[] = JSON.parse(data);

      const carIndex = cars.findIndex(car => car.model.toLowerCase() === carName.toLowerCase());

      if (carIndex === -1) {
        return console.error(`No hay ningún auto con el nombre ${carName}`);
      }

      cars.splice(carIndex, 1);

      await writeFile(this.filePath, JSON.stringify(cars, null, 2));
      return console.log('Auto eliminado correctamente!');
    } catch (error) {
      console.error('Algo ha salido mal al leer el archivo:', error);
    }
  }
}

export { Car };
