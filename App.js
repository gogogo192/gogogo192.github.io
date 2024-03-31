import { Random, Console } from "@woowacourse/mission-utils";

class Car {
    constructor(name) {
        this.name = this.validateName(name);
        this.position = 0;
    }

    validateName(name) {
        if (name.length > 5) {
            throw new Error("�ڵ��� �̸��� �ִ� 5���ڱ��� �����մϴ�.");
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
}

class Application {
    static MOVING_FORWARD = 4;

    static async main() {
        let input = await Console.readLineAsync("������ �ڵ��� �̸��� �Է��ϼ���.(�̸��� ��ǥ(,) �������� ����) ");
        let carNames = input.split(",");
        let cars = carNames.map(carName => new Car(carName));

        let tryCountInput = await Console.readLineAsync("�õ��� ȸ���� ��ȸ�ΰ���? ");
        if (isNaN(parseInt(tryCountInput))) {
            console.log("�ùٸ� ���ڸ� �Է��ϼ���.");
            return;
        }
        let tryCount = parseInt(tryCountInput);

        console.log("\n���� ���\n");
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
            console.log("���� �����: " + winners.join(", "));
        } else {
            console.log("���� �����: " + winners[0]);
        }
    }
}

Application.main();