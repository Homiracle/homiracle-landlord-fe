import * as Yup from 'yup';

export const contractFormValidationSchema = Yup.object().shape({
        start_date: Yup.string().required(),
        end_date:Yup.string().required(),
        couting_fee_day:Yup.string().required(),
        paying_cost_cycle: Yup.number().required(),
        reference_cost: Yup.object({
            deposit: Yup.number().optional().positive(),
            room_cost:Yup.number().positive(),
            water_cost: Yup.number().positive(),
            power_cost:Yup.number().positive(),
          }),

    // cost_per_room: Yup.number().positive(),
});
