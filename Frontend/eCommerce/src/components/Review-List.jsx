//----- CONSTRUCTOR -----//

function Review(productId, userId, score, body) {
  if (score === undefined) {
    throw new Error("Elige una puntuación");
  }

  return {
    productId,
    userId,
    score,
    body: body || ""
  };
}


//----- OBJETO DE PRUEBA -----//

const productId = 1;
const userId = 2;
const score = 1;
const body = "Más malo que pegarle a un padre con un calcetín sudado";


//----- FUNCIÓN PARA MANDAR LA REVIEW AL BACK -----//

const newReview = Review(productId, userId, score, body);

const sendReview = async () => {
  try {
    const response = await fetch("https://localhost:7015/api/Review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReview)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Review enviada exitosamente:", data);
    } else {
      console.error("Error al enviar la review:", response.statusText);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};