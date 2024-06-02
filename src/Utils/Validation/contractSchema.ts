import * as Yup from 'yup';

export const contractFormValidationSchema = Yup.object().shape({
  start_date: Yup.string().required(),
  end_date: Yup.string().required().test('end-date', 'Ngày kết thúc phải sau ngày bắt đầu', function(value) {
    const { start_date } = this.parent;
    return new Date(value) > new Date(start_date);
  }),
  couting_fee_day: Yup.string().required().test('count_day', 'Ngày tính phí phải là một ngày trong tháng', function(value) {
    const date = Number(value);
    return date > 0 && date < 32; 
  }),
  paying_cost_cycle: Yup.number().required(),
  reference_cost: Yup.object({
    deposit: Yup.number().optional().positive(),
    room_cost: Yup.number().positive(),
    water_cost: Yup.number().positive(),
    power_cost: Yup.number().positive(),
  }),
});
