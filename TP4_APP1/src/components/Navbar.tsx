

export default function Navbar() {
    return (
    <nav className="flex items-center bg-amarillo justify-center md:justify-between w-full px-28 py-4 mb-10">
        <h1 className="text-azuloscuro font-bold text-2xl hidden md:block">¡Hola Jorge, bienvenido a tu scrapper!</h1>
        <img src="/img/logo.png" alt="Logo" className="h-12" />
    </nav>  
    )
}