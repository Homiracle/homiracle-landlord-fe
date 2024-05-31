const toVietnamCurrency = (input: number | string): string => {
    const num = parseInt(input.toString(), 10);
    if (isNaN(num)) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  const parseVietnamCurrency = (input: string): string => {
    return input.replace(/,/g, '');
  };
export { toVietnamCurrency, parseVietnamCurrency };
