import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { Fragment, useState } from "react";
import EmpenhoList from "./EmpenhoList";

const AddEmpenho = () => {
  const EMPENHO_API_BASE_URL =
    "https://expenses-system-back.herokuapp.com/api/v1/empenhos";

  const router = useRouter();
  const nrDespesaRouter = router.query.nrProtocolo;

  const [isOpen, setIsOpen] = useState(false);
  const [empenho, setEmpenho] = useState({
    anoEmpenho: "",
    nrEmpenho: "",
    nrDespesa: nrDespesaRouter,
    data: "",
    valor: "",
    observacao: "",
  });

  const [responseEmpenho, setResponseEmpenho] = useState({
    anoEmpenho: "",
    nrEmpenho: "",
    nrDespesa: nrDespesaRouter,
    data: "",
    valor: "",
    observacao: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    setEmpenho({ ...empenho, [event.target.name]: value });
  };

  const saveEmpenho = async (e: any) => {
    e.preventDefault();
    setEmpenho({ ...empenho, nrDespesa: nrDespesaRouter });
    if (empenho.nrDespesa == undefined) {
      saveEmpenho;
      return;
    }
    const response = await fetch(EMPENHO_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empenho),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _empenho = await response.json();
    setResponseEmpenho(_empenho);
    reset(e);
  };

  const reset = (e: any) => {
    e.preventDefault();
    setEmpenho({
      anoEmpenho: "",
      nrEmpenho: "",
      nrDespesa: nrDespesaRouter,
      data: "",
      valor: "",
      observacao: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className=" flex h-12 justify-between">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold text-sm hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Adicionar Empenho
          </button>
        </div>
      </div>
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
                  Adicionar Novo Empenho
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <form onSubmit={saveEmpenho}>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Ano do Empenho
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="number"
                          name="anoEmpenho"
                          value={empenho.anoEmpenho}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Data do Empenho
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="date"
                          name="data"
                          value={empenho.data}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Valor do Empenho
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="number"
                          name="valor"
                          value={empenho.valor}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-28 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Observação
                        </label>
                        <textarea
                          name="observacao"
                          value={empenho.observacao}
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
      <EmpenhoList empenho={responseEmpenho} />
    </>
  );
};

export default AddEmpenho;
