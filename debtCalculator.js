// Debt calculation logic
class DebtCalculator {
    constructor(people) {
        this.people = people;
        this.debts = {};
        this.initializeDebts();
    }

    initializeDebts() {
        this.people.forEach(person => {
            this.debts[person] = {};
            this.people.forEach(other => {
                if (person !== other) {
                    this.debts[person][other] = 0;
                }
            });
        });
    }

    addPayment(payer, amount, splitWith) {
        // Check if payer is included in the split
        const payerIncluded = splitWith.includes(payer);
        
        // If payer is included: divide by number of selected people
        // If payer is NOT included: divide by number of selected people (they're paying only for others)
        const totalPeople = splitWith.length;
        const sharePerPerson = parseFloat((amount / totalPeople).toFixed(2));
        
        splitWith.forEach(person => {
            // Don't add debt to the payer themselves
            if (person !== payer) {
                this.debts[payer][person] = parseFloat((this.debts[payer][person] + sharePerPerson).toFixed(2));
            }
        });
    }

    calculateNetDebts() {
        const netDebts = {};
        const processed = new Set();
        
        this.people.forEach(person1 => {
            this.people.forEach(person2 => {
                if (person1 !== person2) {
                    const pair = [person1, person2].sort().join('-');
                    if (!processed.has(pair)) {
                        processed.add(pair);
                        
                        const debt1to2 = this.debts[person1][person2] || 0;
                        const debt2to1 = this.debts[person2][person1] || 0;
                        const netDebt = parseFloat((debt1to2 - debt2to1).toFixed(2));
                        
                        if (netDebt > 0) {
                            if (!netDebts[person1]) netDebts[person1] = [];
                            netDebts[person1].push({ debtor: person2, amount: netDebt });
                        } else if (netDebt < 0) {
                            if (!netDebts[person2]) netDebts[person2] = [];
                            netDebts[person2].push({ debtor: person1, amount: parseFloat(Math.abs(netDebt).toFixed(2)) });
                        }
                    }
                }
            });
        });
        
        return netDebts;
    }

    getDebtsData() {
        return this.debts;
    }

    setDebtsData(debtsData) {
        if (debtsData) {
            this.debts = debtsData;
        }
    }

    clearAllDebts() {
        this.initializeDebts();
    }
}

// Initialize debt calculator
const debtCalculator = new DebtCalculator(appConfig.people);