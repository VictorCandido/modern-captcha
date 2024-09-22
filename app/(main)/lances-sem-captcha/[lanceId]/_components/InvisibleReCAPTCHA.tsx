// components/InvisibleReCAPTCHA.js
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
    onResolved: (token: any) => void;
}

export default function InvisibleReCAPTCHA({ onResolved }: Props) {
    const recaptchaRef = useRef<any>(null);

    const handleSubmit = () => {
        recaptchaRef.current.execute();
    };

    const handleRecaptchaChange = (token: any) => {
        onResolved(token);
        recaptchaRef.current.reset();
    };

    return (
        <>
            <Button
                type="submit"
                id='newBidButton'
                onClick={handleSubmit}
            >
                Enviar Lance
            </Button>

            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdB3T0qAAAAAJCXAh8guDdIMLQVZMh9PKtBq-mr" // substitua pela sua site key
                size="invisible"
                onChange={handleRecaptchaChange}
            />
        </>
    );
};