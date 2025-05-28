import cars from './cars.json';
import { Car } from './model';
import type { InfoCar } from './model';

function args(): string[] {
  return process.argv.slice(2);
}

function main() {
  const argumentos = args();
  const car = new Car();

  if (argumentos.length === 0) {
    return console.log(cars);
  }

  for (let i = 0; i < argumentos.length; i++) {
    const argument = argumentos[i];
    const firstParameter = argumentos[i + 1];

    if (argument === '--getAll') {
      car.getAllCars();
      i++;
    } else if (argument === '--addCar') {
      try {
        const newCar: InfoCar = JSON.parse(firstParameter || '');
        car.addCar(newCar);
      } catch (error) {
        console.error('El fórmato del auto es inválido');
      }
      i++;
    } else if (argument === '--deleteCar') {
      try {
        const carName: string = firstParameter || '';
        car.deleteCar(carName);
      } catch (error) {
        console.error('Error al eliminar el auto:', error);
      }
      i++;
    } else if (argument === '--getMoreHP') {
      car.getCarWithMoreHP();
      i++;
    }
  }
}

main();
