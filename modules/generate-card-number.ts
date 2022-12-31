interface CardDto {
  number: string,
  cvv: string,
  expires: string,
  flag: string,
  owner: string
}

export function generate(flag: string, finalDigit: number): CardDto {
  let cardNumber;
  do {
    cardNumber = generateCreditCard(flag.toLowerCase());
  } while(cardNumber[cardNumber.length - 1] != finalDigit);

  return {
    number: cardNumber,
    cvv: '123',
    expires: '12/28',
    flag: flag[0].toUpperCase()+flag.slice(1).toLowerCase(),
    owner: 'John Doe'
  } 
}

let pseudoRandom = Math.random;

const amexPrefixList: string[] = ['34', '37'];
const enRoutePrefixList: string[] = ['2014', '2149'];
const mastercardPrefixList: string[] = ['51', '52', '53', '54', '55'];
const dinersPrefixList: string[] = ['300', '301', '302', '303', '36', '38'];
const visaPrefixList: string[] = ['4539','4556','4916','4532','4929','40240071','4485','4716','4'];
const jcbPrefixList: string[] = new Array('35');
const voyagerPrefixList: string[] = new Array('8699');
const discoverPrefixList: string[] = new Array('6011');

function strrev(str: string): string {
  if (!str) return '';
  let revstr = '';
  for (let i = str.length - 1; i >= 0; i--) revstr += str.charAt(i);
  return revstr;
}

function completed_number(prefix: string, length: number): string {
  while (prefix.length < length - 1) prefix += Math.floor(pseudoRandom() * 10);
  const reversedCCnumberString = strrev(prefix);
  const reversedCCnumber: any = [];
  for (let i = 0; i < reversedCCnumberString.length; i++) 
    reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));

  let sum = 0, pos = 0;
  while (pos < length - 1) {
    let odd = reversedCCnumber[pos] * 2;
    if (odd > 9) odd -= 9;
    sum += odd;
    if (pos != length - 2) sum += reversedCCnumber[pos + 1];
    pos += 2;
  }
  return prefix + ((Math.floor(sum / 10) + 1) * 10 - sum) % 10; //ccnumber + checkDigit
}

function cardNumber(prefixList: string[], length: number): string {
  return completed_number(prefixList[Math.floor(pseudoRandom() * prefixList.length)], length);
}

const schemes = {
  visa: { prefixList: visaPrefixList, digitCount: 16 },
  master: { prefixList: mastercardPrefixList, digitCount: 16 },
  amex: { prefixList: amexPrefixList, digitCount: 15 },
  diners: { prefixList: dinersPrefixList, digitCount: 16 },
  discover: { prefixList: discoverPrefixList, digitCount: 16 },
  enroute: { prefixList: enRoutePrefixList, digitCount: 16 },
  jcb: { prefixList: jcbPrefixList, digitCount: 16 },
  voyager: { prefixList: voyagerPrefixList, digitCount: 16 },
};

function generateCreditCard(cardScheme: string): string {
  pseudoRandom = pseudoRandom;
  switch (cardScheme) {
    case 'visa': return cardNumber(schemes['visa'].prefixList, schemes['visa'].digitCount);
    case 'master': return cardNumber(schemes['master'].prefixList, schemes['master'].digitCount);
    case 'amex': return cardNumber(schemes['amex'].prefixList, schemes['amex'].digitCount);
    case 'diners': return cardNumber(schemes['diners'].prefixList, schemes['diners'].digitCount);
    case 'discover': return cardNumber(schemes['discover'].prefixList, schemes['discover'].digitCount);
    case 'enroute': return cardNumber(schemes['enroute'].prefixList, schemes['enroute'].digitCount);
    case 'jcb': return cardNumber(schemes['jcb'].prefixList, schemes['jcb'].digitCount);
    case 'voyager': return cardNumber(schemes['voyager'].prefixList, schemes['voyager'].digitCount);
    default: return cardNumber(schemes['master'].prefixList, schemes['master'].digitCount);
  }
}
