import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
    data: Array<number>;
    title: string;
}

const Table = ({ data, title }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-1">
                    {data.map((bid, index) => (
                        <li key={index} className="text-lg">
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bid)}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default Table;