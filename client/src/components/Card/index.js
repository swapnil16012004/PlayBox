export default function Card({ _id, image, title, category }) {
  return (
    <div className="card">
      <a href={`/listings/${category}/${_id}`} className="newCard">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-img-overlay"></div>
      </a>
    </div>
  );
}
