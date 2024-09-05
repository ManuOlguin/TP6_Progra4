import React, { useState, useEffect } from 'react';
import { eliminarProducto } from "../app/utils";
import { useUpdateTrigger } from "../app/context";

interface eliminarProps {
  meli_id: string;
  nombre: string;
  setShowPopupEliminar: (show: boolean) => void;
}
interface ProductoParams {
  meli_id: string;
}

export default function PopUpEliminar(props: eliminarProps) {
  const { setTriggerUpdate, triggerUpdate } = useUpdateTrigger();
  const [isAnimating, setIsAnimating] = useState(false); 
  const [opacity, setOpacity] = useState(0); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(100);
    }, 10);
  
    return () => {
      clearTimeout(timer);
    };
  }, []);


  function deleteProducto(meli_id: string) {
    setIsAnimating(true); 
    const timer = setTimeout(() => {
        setOpacity(100);
      }, 10);
      
    setTimeout(() => {
      const params: ProductoParams = { meli_id };
      eliminarProducto(params);
      setTriggerUpdate(!triggerUpdate);
      props.setShowPopupEliminar(false); 
    }, 500); 



  }

  return (
<div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isAnimating ? 'opacity-0' : 'opacity-100'} duration-500`}
      style={{ opacity: opacity / 100 }} 
    >      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
        <p className="mb-4">¿Deseas eliminar {props.nombre}?</p>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-2 w-full bg-rojo text-white rounded hover:bg-red-700 transition-all"
            onClick={() => deleteProducto(props.meli_id)}
          >
            Eliminar
          </button>
          <button
            className="px-4 py-2 w-full bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-all"
            onClick={() => { const timer = setTimeout(() => {
                setOpacity(0);
              }, 10);    setTimeout(() => {

                props.setShowPopupEliminar(false); 
              }, 500);  
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}