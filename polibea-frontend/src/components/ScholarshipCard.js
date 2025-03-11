import Image from "next/image";

const ScholarshipCard = ({ photo }) => {
  return (
    <div>
      <Image 
        src={`http://localhost:5001/uploads/${photo}`} 
        alt="Beasiswa"
        width={200}
        height={200}
      />
    </div>
  );
};

export default ScholarshipCard;
