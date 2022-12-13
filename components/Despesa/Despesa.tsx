import Link from "next/link";
import React from "react";

interface Despesa {
  nrProtocolo: number;
  tipo: string;
  dtProtocolo: Date;
  dtVencimento: Date;
  credor: string;
  descricao: string;
  situacaoDespesa: string;
  valor: number;
}

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const Despesa = ({ despesa }: any) => {
  return (
    <tr key={despesa.nrProtocolo}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link href={`/despesa/${despesa.nrProtocolo}`}>
          <div className="text-sm text-gray-500">{despesa.nrProtocolo}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link href={`/despesa/${despesa.nrProtocolo}`}>
          <div className="text-sm text-gray-500">{despesa.tipo}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link href={`/despesa/${despesa.nrProtocolo}`}>
          <div className="text-sm text-gray-500">
            {addHours(3, despesa.dtProtocolo)}
          </div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link href={`/despesa/${despesa.nrProtocolo}`}>
          <div className="text-sm text-gray-500">{despesa.credor}</div>
        </Link>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap">
        <Link href={`/despesa/${despesa.nrProtocolo}`}>
          <div className="text-sm text-gray-500">{despesa.situacaoDespesa}</div>
        </Link>
      </td>
    </tr>
  );
};

export default Despesa;
