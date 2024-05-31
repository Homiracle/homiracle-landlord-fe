const toVietnamCurrency = (input: number | string) => {
    const num = parseInt(input.toString(), 10);
    if (isNaN(num)) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const parseVietnamCurrency = (input: any) => {
    return input.replace(/\D/g, '');
};
export { toVietnamCurrency, parseVietnamCurrency };
