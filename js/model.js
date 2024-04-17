
const budget = [];

function createRecord(formData) {
    let id = 1;
	if (budget.length > 0) {
		const lastElement = budget[budget.length - 1];
		const lastElID = lastElement.id;
		id = lastElID + 1;
	}

	const record = {
		id: id,
		type: formData.type,
		title: formData.title.trim(),
		value: +formData.value,
	};

	budget.push(record);
    return record;
}

function deleteRecord(id) {
    const index = budget.findIndex(function (element) {
        if (id === element.id) return true;
    });

    budget.splice(index, 1);
}

function calcBudget () {
    const totalIncome = budget.reduce(function(total, element) {
        if (element.type === 'inc') {
            return total + element.value;
        } else {
            return total;
        }
    }, 0)

    const totalExpense = budget.reduce(function(total, element){
         if (element.type === 'exp') {
				return total + element.value;
			} else {
				return total;
			}
    }, 0);

    const totalBudget = totalIncome - totalExpense;

    let expensePercents = 0;
    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome)
    }
	return {
		totalIncome, 
		totalExpense,
		totalBudget, 
		expensePercents
	};
}

function getTestdata() {
	const testData = [
		{ type: 'inc', title: 'Фриланс', value: 1500 },
		{ type: 'inc', title: 'Зарплата', value: 2000 },
		{ type: 'inc', title: 'Бизнес', value: 2000 },
		{ type: 'inc', title: 'Рента', value: 1000 },
		{ type: 'exp', title: 'Продукты', value: 300 },
		{ type: 'exp', title: 'Кафе', value: 200 },
		{ type: 'exp', title: 'Транспорт', value: 200 },
		{ type: 'exp', title: 'Квартира', value: 500 },
	];

    function getRandomInt (max) {
        return Math.floor(Math.random() * max);
    }

    const randomIndex = getRandomInt(testData.length);
    const randomData = testData[randomIndex];
	return randomData;
}

function getMonthInYear() {
	const now = new Date();
    const year = now.getFullYear(); 
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    });
    const month = timeFormatter.format(now);
	return {month, year}
}

export {
    createRecord,
    deleteRecord,
	calcBudget,
	getTestdata,
	getMonthInYear,
}