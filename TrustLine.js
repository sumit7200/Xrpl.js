class TrustLine {
    constructor(currency, limit) {
        this.currency = currency;
        this.limit = limit;
    }
}

class Account {
    constructor(accountId) {
        this.accountId = accountId;
        this.trustLines = [];
    }

    addTrustLine(currency, limit) {
        const existingTrustLine = this.trustLines.find(line => line.currency === currency);
        if (existingTrustLine) {
            console.log(`Trust line for ${currency} already exists. Updating limit to ${limit}.`);
            existingTrustLine.limit = limit;
        } else {
            const newTrustLine = new TrustLine(currency, limit);
            this.trustLines.push(newTrustLine);
            console.log(`Added trust line for ${currency} with a limit of ${limit}.`);
        }
    }

    removeTrustLine(currency) {
        const index = this.trustLines.findIndex(line => line.currency === currency);
        if (index !== -1) {
            this.trustLines.splice(index, 1);
            console.log(`Removed trust line for ${currency}.`);
        } else {
            console.log(`No trust line found for ${currency}.`);
        }
    }

    showTrustLines() {
        console.log(`Trust lines for account ${this.accountId}:`);
        this.trustLines.forEach(line => {
            console.log(`${line.currency}: Limit - ${line.limit}`);
        });
    }
}

// Create an account
const myAccount = new Account("myAccountId");

// Add trust lines
myAccount.addTrustLine("USD", 1000);
myAccount.addTrustLine("EUR", 500);

// Show trust lines
myAccount.showTrustLines();

// Update a trust line
myAccount.addTrustLine("USD", 2000);

// Show updated trust lines
myAccount.showTrustLines();

// Remove a trust line
myAccount.removeTrustLine("EUR");

// Show remaining trust lines
myAccount.showTrustLines();
