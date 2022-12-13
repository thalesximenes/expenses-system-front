import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";

const EditPagamento = (pagamentoId: any) => {
  const PAGAMENTO_API_BASE_URL =
    "https://expenses-system-back.herokuapp.com/api/v1/pagamentos";

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [pagamento, setPagamento] = useState({
    anoPagamento: "",
    nrPagamento: "",
    data: "",
    valor: "",
    observacao: "",
  });

  function addHours(numOfHours: number, dateString: string) {
    let date = new Date(dateString);
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date.toLocaleDateString("ja-JP").replace(/\//g, "-");
  }

  useEffect(() => {
    const fetchData = async () => {
      if (
        pagamentoId.pagamentoId == "" ||
        typeof pagamentoId.pagamentoId !== "string"
      ) {
        return;
      }
      let anoPagamento = pagamentoId.pagamentoId.split("-")[1];
      let nrPagamento = pagamentoId.pagamentoId.split("-")[0];
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
        const _pagamento = await response.json();
        _pagamento.data = addHours(3, _pagamento.data);
        setPagamento(_pagamento);
        openModal();
      } catch (error) {
        console.log(error);
      }
    };
    if (pagamentoId !== "") {
      fetchData();
    }
  }, [pagamentoId]);

  function closeModal() {
    pagamentoId = null;
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    setPagamento({ ...pagamento, [event.target.name]: value });
  };

  const reset = (e: any) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const updatePagamento = async (e: any) => {
    e.preventDefault();
    let anoPagamento = pagamentoId.PagamentoId.split("-")[0];
    let nrPagamento = pagamentoId.PagamentoId.split("-")[1];
    const response = await fetch(
      `${PAGAMENTO_API_BASE_URL}/${anoPagamento}/${nrPagamento}`,
      {
        method: "PUT",
        headers: {
          "Content=Type": "application/json",
        },
        body: JSON.stringify(pagamento),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _pagamento = await response.json();
    if (_pagamento.message == null) {
      router.reload();
    }
    reset(e);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screnn px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity=100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity=0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Alterar Pagamento
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <form onSubmit={updatePagamento}>
                    <div className="h-14 mt-4">
                      <label className="flex text-gray-600 text-sm font-normal">
                        Valor do Emepnho
                        <p className="text-red-600 text-sm">*</p>
                      </label>
                      <input
                        type="text"
                        name="valor"
                        value={pagamento.valor}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                        required
                      ></input>
                    </div>
                    <div className="h-14 mt-4">
                      <label className="flex text-gray-600 text-sm font-normal">
                        Data do Pagamento
                        <p className="text-red-600 text-sm">*</p>
                      </label>
                      <input
                        type="date"
                        name="data"
                        value={pagamento.data}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                        required
                      ></input>
                    </div>
                    <div className="h-28 mt-4">
                      <label className="flex text-gray-600 text-sm font-normal">
                        Observação
                        <p className="text-red-600 text-sm">*</p>
                      </label>
                      <textarea
                        name="observacao"
                        value={pagamento.observacao}
                        onChange={(e) => handleChange(e)}
                        className="h-24 w-96 border mt-2 px-2 py-2"
                      ></textarea>
                    </div>
                    <div className="h-8 my-4 space-x-4 pt-4 text-right">
                      <button
                        type="submit"
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      >
                        Fechar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
export default EditPagamento;
