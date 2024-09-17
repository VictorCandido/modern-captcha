export default async function validateCaptcha(token: string) {
    const RECAPTCHA_SECRET_KEY = '6LdB3T0qAAAAAOsTOqWQoYT2YPlMaNypfZJacPrp';

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
            { method: 'POST' }
        ).then(res => res.json());

        console.log(JSON.stringify(response, null, 2));

        return response.success;
    } catch (error) {
        return false;
    }
}