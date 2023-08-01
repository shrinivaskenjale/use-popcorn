import StarRating from "./StarRating";

const StarRatingDemo = () => {
  return (
    <div>
      <StarRating
        maxRating={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <StarRating maxRating={10} color="red" size={24} defaultRating={3} />
    </div>
  );
};

export default StarRatingDemo;
