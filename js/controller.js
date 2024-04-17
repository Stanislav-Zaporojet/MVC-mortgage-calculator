import * as model from './model.js'
import * as view from './view.js'

function insertTestData () {
    const randomData = model.getTestdata()
    view.randomTestData(randomData);
}

function displayMonth() {
    const monthYear = model.getMonthInYear()
    view.renderMonth(monthYear.month, monthYear.year)
}
displayMonth()
insertTestData();

view.renderBudget(model.calcBudget());

view.elements.form.addEventListener('submit', function(e){
	e.preventDefault();
    const checkResult = view.checkEmptyFilds();
    if (checkResult === false) return;
    const formData = view.getFromData();
    const record = model.createRecord(formData);
    view.renderRecord(record)
    view.renderBudget(model.calcBudget());
    view.clearForm();
    insertTestData();
})

document.body.addEventListener('click', function (e) {
    if (e.target.closest('button.item__remove')) {
        const id = view.removeRecord(e);
        model.deleteRecord(id);
view.renderBudget(model.calcBudget());

	}
})