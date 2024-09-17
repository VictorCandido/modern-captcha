"use client";
import { ControllerRenderProps } from "react-hook-form";

import { Input } from "@/components/ui/input";

type Props = {
    field: ControllerRenderProps<any>
};

export default function CurrencyInput({ field }: Props) {
    const mascaraMoeda = (event: any) => {
        const onlyDigits = event.target.value
            .split("")
            .filter((s: any) => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = maskCurrency(digitsFloat)
    }

    const maskCurrency = (valor: string, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(Number(valor))
    }

    return (
        <Input
            {...field}
            onInput={mascaraMoeda}
        />
    );
}
