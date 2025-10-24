export default function Card({ id, img, name, onClick }) {
  return (
    <div key={{ id }} className="card" onClick={() => onClick(id)}>
      <div className="cardImgContainer">
        <img src={`${img}`} alt={name} referrerPolicy="no-referrer" className="cardImg"/>
      </div>
      <h4 className="cardName">{name}</h4>
    </div>
  );
}
