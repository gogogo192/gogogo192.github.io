import { Random, Console } from "@woowacourse/mission-utils";//코드를 나눠서 작성할것

class Car {
    constructor(name) {
        this.name = this.validateName(name);
        this.position = 0;
    }

    validateName(name) {
        if (name.length > 5) {
            throw new Error("자동차 이름은 최대 5글자까지 가능합니다.");
        }
        return name;
    }

    move() {
        const MOVING_FORWARD = 4;
        let randomNumber = Random.pickNumberInRange(0, 9);
        if (randomNumber >= MOVING_FORWARD) {
            this.position++;
        }
    }

    getName() {
        return this.name;
    }

    getPosition() {
        return this.position;
    }
    
    static async createCarsFromUserInput() {
        let input = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) ");
        let carNames = input.split(",");
        return carNames.map(carName => new Car(carName));
    }
}

class Application {
    static MOVING_FORWARD = 4;

    static async main() {
        let cars = await Car.createCarsFromUserInput();

        let tryCount = parseInt(await Console.readLineAsync("시도할 회수는 몇회인가요? "));

        console.log("\n실행 결과\n");
        for (let i = 0; i < tryCount; i++) {
            for (let car of cars) {
                car.move();
                console.log(car.getName() + " : " + "-".repeat(car.getPosition()));
            }
            console.log();
        }

        let maxPosition = Math.max(...cars.map(car => car.getPosition()));
        let winners = cars.filter(car => car.getPosition() === maxPosition).map(car => car.getName());

        if (winners.length > 1) {
            console.log("최종 우승자: " + winners.join(", "));
        } else {
            console.log("최종 우승자: " + winners[0]);
        }
    }
}

Application.main();
