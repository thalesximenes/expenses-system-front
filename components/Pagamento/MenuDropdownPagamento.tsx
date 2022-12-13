import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import EditPagamento from "./EditPagamento";
import DeletePopUp from "./DeletePopUp";

const MenuDropdownPagamento = () => {
  const PAGAMENTO_API_BASE_URL = "http://localhost:8080/api/v1/pagamentos";
  const router = useRouter();
  const nrDespesaRouter = router.query.nrProtocolo;
  const idEmpenhoRouter = router.query.empenhoKey;
  const idPagamentoRouter = router.query.pagamentoKey;
  const [pagamentoId, setPagamentoId] = useState("");

  let [isOpen, setIsOpen] = useState(0);

  function openModal() {
    if (isOpen == 1) {
      setIsOpen(2);
    } else {
      setIsOpen(1);
    }
  }

  const deleteId = async (e: any) => {
    e.preventDefault();

    let anoPagamento =
      idPagamentoRouter != null
        ? idPagamentoRouter.toString().split("-")[1]
        : "";
    let nrPagamento =
      idPagamentoRouter != null
        ? idPagamentoRouter.toString().split("-")[0]
        : "";

    setPagamentoId("");
    const response = await fetch(
      `${PAGAMENTO_API_BASE_URL}/${nrPagamento}/${anoPagamento}`,
      {
        method: "DELETE",
      }
    );
    const deleted = await response.json();
    if (deleted.deleted) {
      router.push(`/despesa/${nrDespesaRouter}/empenho/${idEmpenhoRouter}`);
    } else {
      openModal();
    }
  };

  const editId = async (e: any) => {
    e.preventDefault();
    if (pagamentoId == idPagamentoRouter) {
      setPagamentoId(idPagamentoRouter + " ");
    } else {
      setPagamentoId(
        typeof idPagamentoRouter === "string" ? idPagamentoRouter : ""
      );
    }
  };
  return (
    <>
      <DeletePopUp isOpens={isOpen} />
      <div className="flex top-16 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-600 bg-opacity-100 px-6 py-3 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Configurações
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={editId}
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <EditActiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <EditInactiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Editar
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <ArchiveActiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArchiveInactiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Relatório
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={deleteId}
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <DeleteActiveIcon
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <DeleteInactiveIcon
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      )}
                      Excluir
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <EditPagamento pagamentoId={pagamentoId} />
    </>
  );
};

export default MenuDropdownPagamento;

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="#8B5CF6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
