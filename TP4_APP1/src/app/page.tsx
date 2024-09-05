"use client"

import Navbar from "../components/Navbar";
import { Producto } from "../app/Modelo";
import Categoria from "../components/Categoria";
import { UpdateTriggerProvider } from "../app/context"; // Import the UpdateTriggerProvider

export default function Home() {
  return (
    <UpdateTriggerProvider> 
      
        <Navbar />
        <div className="px-12 md:px-28">
          <Categoria categoria={"Tus Productos"} ></Categoria> 
        </div>
      
    </UpdateTriggerProvider>
  );
}