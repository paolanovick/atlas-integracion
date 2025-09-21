import { useEffect, useState } from "react";

const AtlasIntegracion = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://167.172.31.249:5678/webhook/ATLAS-API")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.WSProducto || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1>Paquetes Atlas</h1>
      {productos.map((p) => (
        <div key={p.Codigo}>
          <h2>{p.Nombre}</h2>
          <img src={p.Foto} alt={p.Nombre} width="300" />
          <p>{p.Descripcion}</p>
          <p>
            Precio: {p.PrecioDestacadoMonto} {p.PrecioDestacadoMoneda}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AtlasIntegracion;
