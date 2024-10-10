import cardStyles from "@/styles/Card.module.css";
import btnStyles from "@/styles/Button.module.css";

interface CardProps {
  logradouro: string;
  cep: string;
  onClick: () => void;
}

function Card({ logradouro, cep, onClick }: CardProps) {
  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.info}>
        <h3>{logradouro}</h3>
        <span>{cep}</span>
      </div>
      <button className={btnStyles.btn} onClick={onClick}>
        selecionar
      </button>
    </div>
  );
}

export { Card };
