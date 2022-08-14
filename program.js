/*
Long Division Method
(a + b)^2 = a^2 + 2ab + b^2

손으로 하는 나눗셈을 제곱으로 하는 방법이라고 생각하면 된다.
100은 10의 제곱이기 때문에, 큰 수를 두 자리씩 분류하고
각각의 두 자리 수에 가장 가깝거나 같은 제곱수를 빼서
나머지를 다음 자리로 옮기는 방법이다.
*/

// Num을 가능한 한 2자리씩 나눠서 각각의 배열에 추가한다.
function divideEachTwoDigits(num) {
    const digitArr = Array.from(String(num), Number);

    let firstEl = undefined;
    if (!!(digitArr.length % 2))
        firstEl = digitArr.shift();

    const regroupingCount = Math.floor(digitArr.length / 2);

    for (let i = 0; i < regroupingCount; i++) {
        if (!digitArr[i + 1] && digitArr[i + 1] !== 0) break;
        const mergedElement = Number(digitArr[i]) * 10 + Number(digitArr[i + 1]);
        console.log(mergedElement);
        digitArr.splice(i, 2, mergedElement);
    }

    if (firstEl) digitArr.unshift(firstEl);
    return digitArr;
}

// 특정 수를 나눌 수를 구하는 함수이지만, 제곱될 값과 나눌 수와 나뉠 수를 빼서 나온 나머지도 같이 객체로 표현된다.
function findQuotient(_num, divisorSeed = 0, quotient = 1) {
    const divisor = (divisorSeed + quotient) * quotient;
    if (Math.abs(_num) >= divisor) return findQuotient(_num, divisorSeed, quotient + 1);
    const prevQuo = quotient - 1;
    return { quotient: prevQuo, remainder: _num % ((divisorSeed + prevQuo) * prevQuo) }
}

function computeSquareRoot(num) {
    // 이후 Long Division Method를 적용한다.
    const digitArr = divideEachTwoDigits(num);
    let tempRemainder = 0;
    let tempDivisor = 0;
    let result = 0;
    let digitSignifier = digitArr.length;

    while (digitSignifier >= -2) {
        if (digitSignifier === digitArr.length) {
            // 첫 제곱수 구하는 식
            const dividend = digitArr[0];
            const { quotient, remainder } = findQuotient(dividend);
            tempRemainder = remainder;
            tempDivisor = quotient * 2;
            result = quotient * Math.pow(10, digitSignifier - 1);
            digitSignifier--;
            console.log(digitSignifier, result, tempDivisor, tempRemainder, dividend)
        } else {
            const tempDigit = digitArr[digitArr.length - digitSignifier];
            console.log(tempDigit);
            const dividend = tempRemainder * 100 + (tempDigit ? tempDigit : 0);
            console.log(dividend, tempDivisor * 10);
            const { quotient, remainder } = findQuotient(dividend, tempDivisor * 10);
            if (!remainder && remainder !== 0) {
                digitSignifier--;
                tempRemainder *= 100;
                continue;
            }
            tempRemainder = remainder;
            tempDivisor = (tempDivisor * 10) + (quotient * 2);
            const _return = result + (quotient * Math.pow(10, digitSignifier - 1));
            digitSignifier--;
            result = _return;
        }
    }
    return Math.round(result*100)/100;
}