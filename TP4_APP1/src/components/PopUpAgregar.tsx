import React, { useState, useEffect } from 'react';

import { agregarProducto } from '../app/utils';
import { useUpdateTrigger } from '../app/context';
import { Producto } from '../app/Modelo';

interface agregarProps {
    setShowPopupAgregar: (show: boolean) => void;
    listado: Producto[];
}
interface ProductoParams { 
    meli_id: string;
}

function agregarProductoHandler(meli_id: string) {
    const params: ProductoParams = { meli_id }; 

    agregarProducto(params);
}
const extractIdFromUrl = (url: string): string | null => {

    const match = url.match(/\/p\/(MLA\d+)/);
    const match2 = url.match(/\/(MLA-\d+)-/); 
    
    if (match) {
        return match[1];
    } else if (match2) {
        return match2[1].replace(/-/g, '');
    } else {
        return null;
    } 
  };
  const validateIdNotInListado = (id: string, listado: string[]): boolean => {
    return !listado.includes(id);
  };
export default function PopUpAgregar(props: agregarProps) {


    const { setTriggerUpdate, triggerUpdate } = useUpdateTrigger(); 

    const [opacity, setOpacity] = useState(0); 

    useEffect(() => {
      const timer = setTimeout(() => {
        setOpacity(100);
      }, 10);
    
      return () => {
        clearTimeout(timer);
      };
    }, []);
    const [productId, setProductId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false); 

    const validateAndAddProduct = () => {
        const id = extractIdFromUrl(productId)
        console.log(id, props.listado);
        if (id) {
            if(!validateIdNotInListado(id, props.listado.map(p => p.meli_id)))
                {
                    setErrorMessage('Este producto ya fue agregado');

                }
                else{
                    setIsAnimating(true); 
                    const timer = setTimeout(() => {
                        setOpacity(0);});

                    setTimeout(() => {
                      agregarProductoHandler(id); 
                      setTriggerUpdate(!triggerUpdate);
                      setErrorMessage(''); 
                      props.setShowPopupAgregar(false);
                    }, 550);
                    
                }

        } else {
            setErrorMessage('Este link no es válido');
        }
    };

    return (
        <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isAnimating ? 'opacity-0' : 'opacity-100'} duration-500`}
      style={{ opacity: opacity / 100 }} onClick={() => { const timer = setTimeout(() => {
        setOpacity(0);
      }, 10);    setTimeout(() => {

        props.setShowPopupAgregar(false); 
      }, 500);  
    }}>
      

            <div className="bg-white p-8 rounded-lg shadow" onClick={(e) => e.stopPropagation()}>

                <h2 className="text-xl text-black font-bold mb-4">Agregar producto</h2>
                <p className="mb-4">Ingrese el link de Mercado Libre del producto</p>
                <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="mb-2 px-4 py-2 w-full bg-white border rounded"
                    placeholder="ID del producto"
                />
                {errorMessage && <p className="text-red-500 pb-2">{errorMessage}</p>}
                <div className="flex">
                    <button
                        className="px-4 py-2 bg-verde w-full text-white rounded"
                        onClick={validateAndAddProduct}
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    )
}