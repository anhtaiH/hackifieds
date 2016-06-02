const ListingInfo = props => (
  <div className='listing-info'>
    <div className="listing-info-date"> {props.listing.createdAt} | </div>
    <div className="listing-info-title"> {props.listing.title} </div>
    <div className="listing-info-location"> {props.listing.location} | </div>
    <div className="listing-info-price"> {props.listing.price} | </div>
    <div className="listing-info-description"> {props.listing.description} | </div>
    <div className="listing-info-email"> {props.listing.email} | </div>
    <div className="listing-info-telphone"> {props.listing.telephone} | </div>
  </div>
);

export default ListingInfo;
