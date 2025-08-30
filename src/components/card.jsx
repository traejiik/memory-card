export default function Card({ id, img, name, onClick }) {
  return (
    <div key={{ id }} className="card" onClick={() => onClick(id)}>
      <div className="card-img">
        <img src={img} alt={name} />
      </div>
      <h4 className="card-title">{name}</h4>
    </div>
  );
}
