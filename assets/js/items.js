class Rupee {
  constructor() {
    this.rupees = [
      "green_rupee",
      "blue_rupee",
      "red_rupee",
      "purple_rupee",
      "silver_rupee",
      "gold_rupee"
    ];
    this.values = [
      1,
      5,
      20,
      50,
      200,
      300
    ]
  }

  randomRupee() {
    this.randRupee = Math.floor(Math.random() * this.rupees.length) + 1;
    return this.randRupee;
  }

  getRupee() {
    return this.randomRupee();
  }


}
