export default class Field {
  constructor() {
    this.fieldSize = 4;
    this.cells = [];
    this.currentIndex;
    this.points = 0;
    this.countBlow = 5;
    this.countAppearances = 0;
    this.gameOver = false;
    this.setCursor = this.setCursor.bind(this);
  }

  init() {
    const tegBody = document.querySelector("body");

    this.fieldEl = document.createElement("div");
    this.fieldEl.classList.add("field");

    this.fieldEl.addEventListener("click", this.attack.bind(this));
    this.fieldEl.addEventListener("mouseover", this.setCursor.bind(this));
    this.fieldEl.addEventListener("mouseout", this.setCursor.bind(this));

    for (let i = 0; i < this.fieldSize * this.fieldSize; i += 1) {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      this.fieldEl.appendChild(cellEl);
    }

    tegBody.appendChild(this.fieldEl);

    this.cells = Array.from(this.fieldEl.children);
    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    const a = Math.random() * this.fieldSize * this.fieldSize;
    const randomNumber = Math.floor(a);
    // const randomNumber = Math.floor(
    //   Math.random() * this.fieldSize * this.fieldSize,
    // );

    if (!isNaN(this.currentIndex)) {
      this.cells[this.currentIndex].classList.remove("icon");
    }

    if (this.currentIndex !== randomNumber) {
      this.currentIndex = randomNumber;
      this.cells[this.currentIndex].classList.add("icon");
      this.countAppearances += 1;
      if (this.countAppearances === 5 || this.countBlow === 0) {
        console.log("over");
        clearInterval(this.intervalId);
        this.fieldEl.removeEventListener("mouseover", this.setCursor);
        this.fieldEl.removeEventListener("mouseout", this.setCursor);
        this.gameOver = true;
      }
    }
  }

  attack(e) {
    if (!this.gameOver) {
      if (e.target.classList.contains("icon")) {
        this.points += 1;
        this.countAppearances = 0;
        console.log("Ваши очки: " + this.points);
      } else {
        this.countBlow -= 1;
        console.log("Ваши попытки: " + this.countBlow);
      }
    }
  }

  setCursor(e) {
    if (e.target.classList.contains("icon")) {
      // e.target.style.cursor = "pointer";
      e.target.style.cursor = "url(../img/hammer128.png)";
    } else if (!e.target.classList.contains("icon")) {
      e.target.style.removeProperty("cursor");
    }
  }
}
