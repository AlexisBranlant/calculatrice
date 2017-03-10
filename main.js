$(function(){//ready
	var calc = {
		"result": 0,
		"firstVal": null,
		"secondVal": null,
		"currentVal":"firstVal",
		"operator": null,
		"printResult": function(value){
			$('.calc-screen').text(value);
		},
		"calcul": function(){
			switch(calc.operator) {
				case "/": 
					calc.result = parseFloat(calc.firstVal) / parseFloat(calc.secondVal);
					break;
				case "X": 
					calc.result = parseFloat(calc.firstVal) * parseFloat(calc.secondVal);
					break;
				case "-": 
					calc.result = parseFloat(calc.firstVal) - parseFloat(calc.secondVal);
					break;
				case "+": 
					calc.result = parseFloat(calc.firstVal) + parseFloat(calc.secondVal);
					break;
				default: break;
			}
			calc.printResult(calc.result);
		}
	};
	$('.calc').on('click', '.calc-btn', function(){
		if($(this).hasClass('calc-operator')) {
			//operator
			var operator = $(this).text();
			if(operator == "=") {
				if(calc.firstVal == null && calc.secondVal == null) {
					return;
				}
				calc.calcul();
				calc.firstVal = null;
				calc.secondVal = null;
				calc.operator = null;
				calc.currentVal = "firstVal";
			} else if(operator == ".") {
				
				if(calc[calc.currentVal].indexOf('.') != -1) {
					return;
				}
				calc[calc.currentVal] += operator;
				calc.printResult(calc[calc.currentVal]);
			} else {
				if(calc.firstVal == null) {
					calc.firstVal = 0;
					calc.currentVal = "secondVal";
				}
				if(calc.operator == null && calc.result != 0) {
					calc.firstVal = calc.result;
					calc.result = 0;
				}
				if(calc.operator != null && calc.secondVal != null) {
					calc.calcul();
					calc.firstVal = calc.result;
					calc.secondVal = null;
					calc.result = 0;
				}
				calc.operator = operator;
				calc.currentVal = "secondVal";
			}
		} else if($(this).hasClass('calc-reset')) {
			calc.result = 0;
			calc.firstVal = null;
			calc.secondVal = null;
			calc.operator = null;
			calc.currentVal = "firstVal";
			calc.printResult(calc.result);
		} else {
			//number
			if(calc.result != 0) {
				calc.result = 0;
			}
			var number = $(this).text();
			if(calc[calc.currentVal] == null) {
				calc[calc.currentVal] = number;
			} else {
				calc[calc.currentVal] += number;
			}
			calc.printResult(calc[calc.currentVal]);
		}
		
		console.log(calc);
	});
	
})