import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuDropdownDespesa from "./MenuDropdownDespesa";

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const DespesaDetail = ({ despesa }: any) => {
  const DESPESA_API_BASE_URL = "http://localhost:8080/api/v1/despesas";

  const router = useRouter();
  const nrDespesaRouter = router.query.nrProtocolo;

  const [despesaId, setDespesaId] = useState({
    nrProtocolo: "",
    tipo: "",
    dtProtocolo: "",
    dtVencimento: "",
    credor: "",
    descricao: "",
    situacaoDespesa: "",
    valor: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${DESPESA_API_BASE_URL}/${nrDespesaRouter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const despesaId = await response.json();
        setDespesaId(despesaId);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [despesa, router.isReady]);

  return (
    <div className="container mx-auto my-8 space-y-2">
      <div className="flex mx-auto justify-between">
        <div className="mr-20 my-15">
          <h2 className="font-medium leading-6 text-gray-900 text-4xl">
            Detalhes da Despesa
          </h2>
          {!loading && (
            <p className="font-medium leading-6 text-gray-400 text-base mt-0">
              Número de Protocolo: {despesaId.nrProtocolo}
            </p>
          )}
        </div>
        <MenuDropdownDespesa />
      </div>
      <div className="flex mx-auto ">
        {!loading && (
          <div className="">
            <p className="text-base text-gray-500 mr-2">Tipo de Despesa:</p>
            <p className="text-base text-gray-600 font-bold">
              {despesaId.tipo}
            </p>
          </div>
        )}
        {!loading && (
          <div className="justify-between mx-auto">
            <p className="text-base text-gray-500 mr-2">Credor da Despesa:</p>
            <p className="text-base text-gray-600 font-bold">
              {despesaId.credor}
            </p>
          </div>
        )}
      </div>
      <div className="flex mx-auto">
        {!loading && (
          <div className="">
            <p className="text-base text-gray-500 mr-4">Data do Protocolo:</p>
            <p className="text-base text-gray-600 font-bold mr-4">
              {addHours(3, despesaId.dtProtocolo)}
            </p>
          </div>
        )}
        {!loading && (
          <div className="justify-between mx-auto">
            <p className="text-base text-gray-500 mr-4">Data do Vencimento:</p>
            <p className="text-base text-gray-600 font-bold mr-4">
              {addHours(3, despesaId.dtVencimento)}
            </p>
          </div>
        )}
      </div>
      {!loading && (
        <div className="flex">
          <p className="text-base text-gray-500 mr-2">Situação da Despesa:</p>
          <p className="text-base text-gray-600 font-bold">
            {despesaId.situacaoDespesa}
          </p>
        </div>
      )}
      {!loading && (
        <div className="flex">
          <p className="text-base text-gray-500 mr-2">
            Valor da Despesa em Reais:
          </p>
          <p className="text-base text-gray-600 font-bold">
            R${despesaId.valor}
          </p>
        </div>
      )}
      {!loading && (
        <div className="">
          <p className="text-base text-gray-500 mr-2">Descrição da Despesa:</p>
          <p className="text-base text-gray-600 font-bold flex h-12 justify-start w-max my-4 text-left">
            {despesaId.descricao}
          </p>
        </div>
      )}
    </div>
  );
};

export default DespesaDetail;
