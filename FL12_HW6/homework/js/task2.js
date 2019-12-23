let a = parseFloat(prompt('Enter A','')),
    b = parseFloat(prompt('Enter B','')),
    c = parseFloat(prompt('Enter C',''));

if(isNaN(a) || isNaN(b) || isNaN(c)) {
    alert('input values should be ONLY numbers');
    console.log('input values should be ONLY numbers');
} else if(a === 0 || b === 0 || c ===0) {
        alert('A triangle must have 3 sides with a positive definite length');
        console.log('A triangle must have 3 sides with a positive definite length');
    } else if(c >= a + b || b >= a + c || a >= b + c) {
        alert('Triangle doesn’t exist');
        console.log('Triangle doesn’t exist');
    } else if(a === b && a === c) {
        alert('Equilateral triangle');
        console.log('Equilateral triangle');
    } else if(a === b || a === c || b === c) {
        alert('Isosceles triangle');
        console.log('Isosceles triangle');
    } else {
        alert('Scalene triangle');
        console.log('Scalene triangle');
    }
