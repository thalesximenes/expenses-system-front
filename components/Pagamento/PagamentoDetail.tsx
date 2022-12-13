import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuDropdownPagamento from "./MenuDropdownPagamento";
import Link from "next/link";

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const PagamentoDetail = ({ pagamento }: any) => {
  const PAGAMENTO_API_BASE_URL = "http://localhost:8080/api/v1/pagamentos";

  const router = useRouter();
  let idPagamentoRouter = router.query.pagamentoKey;
  let nrProtocoloDespesa = router.query.nrProtocolo;

  const [pagamentoId, setPagamentoId] = useState({
    anoPgto: "",
    nrPgto: "",
    anoPgtoEmpenho: "",
    nrPgtoEmpenho: "",
    dtPagamento: "",
    valor: "",
    observacao: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    let anoPagamento =
      idPagamentoRouter != null
        ? idPagamentoRouter.toString().split("-")[1]
        : "";
    let nrPagamento =
      idPagamentoRouter != null
        ? idPagamentoRouter.toString().split("-")[0]
        : "";

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${PAGAMENTO_API_BASE_URL}/${nrPagamento}/${anoPagamento}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const pagamentoId = await response.json();
        setPagamentoId(pagamentoId);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [pagamento, router.isReady]);

  return (
    <div className="container mx-auto my-8 space-y-2">
      <div className="flex mx-auto justify-between">
        <div className="mr-20 my-15">
          <h2 className="font-medium leading-6 text-gray-900 text-4xl">
            Detalhes do Pagamento
          </h2>
          <div className={"flex"}>
            {!loading && (
              <p className="font-medium leading-6 text-gray-400 text-base mt-0">
                Número de Pagamento: {pagamentoId.nrPgto}
              </p>
            )}
            {!loading && (
              <p className="font-medium leading-6 text-gray-400 text-base mt-0 ml-5">
                Ano de Pagamento: {pagamentoId.anoPgto}
              </p>
            )}
          </div>
        </div>
        <MenuDropdownPagamento />
      </div>
      <div className="flex mx-auto">
        {!loading && (
          <div className="">
            <p className="text-base text-gray-500 mr-2">
              Valor do Pagamento em Reais:
            </p>
            <p className="text-base text-gray-600 font-bold">
              R${pagamentoId.valor}
            </p>
          </div>
        )}
        {!loading && (
          <div className="justify-between mx-auto">
            <p className="text-base text-gray-500 mr-4">Data de Pagamento:</p>
            <p className="text-base text-gray-600 font-bold mr-4">
              {addHours(3, pagamentoId.dtPagamento)}
            </p>
          </div>
        )}
      </div>
      <div className="flex mx-auto">
        {!loading && (
          <Link
            href={`/despesa/${nrProtocoloDespesa}/empenho/${idPagamentoRouter}`}
            className=""
          >
            <p className="text-base text-gray-500 mr-2 flex">
              Numero do Empenho:
            </p>
            <p className="text-base text-gray-600 font-bold flex">
              {pagamentoId.nrPgtoEmpenho}
            </p>
          </Link>
        )}
        {!loading && (
          <Link
            href={`/despesa/${nrProtocoloDespesa}/empenho/${idPagamentoRouter}`}
            className="justify-between mx-auto"
          >
            <p className="text-base text-gray-500 mr-2 flex">Ano do Empenho:</p>
            <p className="text-base text-gray-600 font-bold flex">
              {pagamentoId.anoPgtoEmpenho}
            </p>
          </Link>
        )}
      </div>
      {!loading && (
        <div className="">
          <p className="text-base text-gray-500 mr-2">Observação:</p>
          <p className="text-base text-gray-600 font-bold flex h-12 justify-start w-max my-4 text-left">
            {pagamentoId.observacao}
          </p>
        </div>
      )}
    </div>
  );
};

export default PagamentoDetail;
