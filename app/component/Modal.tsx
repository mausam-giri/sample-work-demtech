"use client";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  openChange: (val: boolean) => void;
  modalActionButton?: React.ReactNode;
}
export default function Modal({ open, children }: ModalProps) {
  return (
    <>
      {open &&
        createPortal(
          <div className="fixed w-screen h-screen top-0 left-0">
            <div className="absolute top-0 left-0 h-full w-full bg-black/50"></div>
            <div className="flex items-center justify-center relative h-full w-full z-[51]">
              <div className="max-w-fit rounded-lg shadow bg-white px-8 py-6">
                <div>{children}</div>
                {/* <div className="mt-4 flex items-center gap-2 justify-end">
                  {modalActionButton}
                  <button
                    className="bg-red-500"
                    onClick={() => openChange(false)}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>,
          document.getElementsByTagName("body")[0]
        )}
    </>
  );
}
