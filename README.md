# cars-mvc-bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

To get all cars:

```bash
bun src/index.ts --getAll
```

To add a car:

```bash
bun src/index.ts --addCar '{"brand": "[car_brand]", "model": "[car_model]", "year": [car-year], "hp": [car-horsepower]}'
```

To delete a car:

```bash
bun src/index.ts --deleteCar '[car_name]'
```

To get car with more HP:

```bash
bun src/index.ts --getMoreHP
```

This project was created using `bun init` in bun v1.2.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
