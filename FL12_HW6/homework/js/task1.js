let a = parseFloat(prompt('Enter A','')),
    b = parseFloat(prompt('Enter B','')),
    c = parseFloat(prompt('Enter C','')),
    x1 = 0,
    x2 = 0; 
const FOUR = 4,
      TWO = 2;

if(isNaN(a) || isNaN(b) || isNaN(c)) {
    alert('Invalid input data');
} else {
    let d = b*b - FOUR*a*c;
    if(d < 0) {
        alert('No solution ');
    } else {
        x1 = (-b + Math.sqrt(d)) / (TWO * a); 
        x2 = (-b - Math.sqrt(d)) / (TWO * a);

        if(d > 0) {
            alert('x1 = ' + x1 + ' and x2 = ' + x2);
        } else if(d === 0) {
            alert('x = ' + x1);
        }
    }
}
