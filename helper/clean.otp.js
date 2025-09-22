import { Otp } from "../models/otp";

export function cleanOtp(body = {}, expiration_time) {
    const delay = new Date(expiration_time).getTime() - Date.now();

    setTimeout(async () => {
        try {
            await Otp.destroy({ where: { id: body.id } });

        } catch (error) {
            console.error("error in deleting", error);
        }
    }, delay)
}




