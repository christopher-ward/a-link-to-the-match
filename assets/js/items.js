class Rupee {
  constructor() {
    this.rupees = [
      "green_rupee": 1,
      "blue_rupee": 5,
      "red_rupee": 20,
      "purple_rupee": 50,
      "silver_rupee": 200,
      "gold_rupee": 300
    ];
  }
  var rupees = [
  { "green_rupee": 1 },
  { "blue_rupee": 5 },
  { "red_rupee": 20 },
  { "purple_rupee": 50 },
  { "silver_rupee": 200 },
  { "gold_rupee": 300 }
];
rupees[Math.floor(Math.random() * 6)]

  randomRupee() {
    this.randRupee = Math.floor(Math.random() * this.rupees.length) + 1;
    return this.randRupee;
  }

  getRupee() {
    return this.randomRupee();
  }

}
