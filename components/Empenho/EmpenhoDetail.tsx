import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuDropdownEmpenho from "./MenuDropdownEmpenho";
import Link from "next/link";

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const EmpenhoDetail = ({ empenho }: any) => {
  const EMPENHO_API_BASE_URL =
    "https://expenses-system-back.herokuapp.com/api/v1/empenhos";

  const router = useRouter();
  let idEmpenhoRouter = router.query.empenhoKey;

  const [empenhoId, setEmpenhoId] = useState({
    anoEmpenho: "",
    nrEmpenho: "",
    nrDespesa: "",
    data: "",
    valor: "",
    observacao: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    let anoEmpenho =
      idEmpenhoRouter != null ? idEmpenhoRouter.toString().split("-")[1] : "";
    let nrEmpenho =
      idEmpenhoRouter != null ? idEmpenhoRouter.toString().split("-")[0] : "";

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${EMPENHO_API_BASE_URL}/${nrEmpenho}/${anoEmpenho}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const empenhoId = await response.json();
        setEmpenhoId(empenhoId);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [empenho, router.isReady]);

  return (
    <div className="container mx-auto my-8 space-y-2">
      <div className="flex mx-auto justify-between">
        <div className="mr-20 my-15">
          <h2 className="font-medium leading-6 text-gray-900 text-4xl">
            Detalhes do Empenho
          </h2>
          <div className={"flex"}>
            {!loading && (
              <p className="font-medium leading-6 text-gray-400 text-base mt-0">
                Número de Empenho: {empenhoId.nrEmpenho}
              </p>
            )}
            {!loading && (
              <p className="font-medium leading-6 text-gray-400 text-base mt-0 ml-5">
                Ano de Empenho: {empenhoId.anoEmpenho}
              </p>
            )}
          </div>
        </div>
        <MenuDropdownEmpenho />
      </div>
      <div className="flex mx-auto">
        {!loading && (
          <div className="">
            <p className="text-base text-gray-500 mr-2">
              Valor do Empenho em Reais:
            </p>
            <p className="text-base text-gray-600 font-bold">
              R${empenhoId.valor}
            </p>
          </div>
        )}
        {!loading && (
          <div className="justify-between mx-auto">
            <p className="text-base text-gray-500 mr-4">Data de Empenho:</p>
            <p className="text-base text-gray-600 font-bold mr-4">
              {addHours(3, empenhoId.data)}
            </p>
          </div>
        )}
      </div>
      {!loading && (
        <Link href={`/despesa/${empenhoId.nrDespesa}`} className="">
          <p className="text-base text-gray-500 mr-2 flex">
            Numero da Despesa:
          </p>
          <p className="text-base text-gray-600 font-bold flex">
            {empenhoId.nrDespesa}
          </p>
        </Link>
      )}
      {!loading && (
        <div className="">
          <p className="text-base text-gray-500 mr-2">Observação:</p>
          <p className="text-base text-gray-600 font-bold flex h-12 justify-start w-max my-4 text-left">
            {empenhoId.observacao}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmpenhoDetail;
