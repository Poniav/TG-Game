// Button.tsx
// Green - Orange - Blue

const BtnPrimary = ({
  text,
  color,
  link,
}: {
  text: string;
  color: string;
  link: string;
}) => {
  let colorClass = "";
  let colorBottom = "";
  let colorText = "";
  let backgroundClass = "";

  if (color === "green") {
    colorClass = "bg-green-500";
    colorBottom = "border-green-700";
    colorText = "text-green-900";
    backgroundClass = "bg-green-200";
  } else if (color === "orange") {
    colorClass = "bg-orange-500";
    colorBottom = "border-orange-700";
    colorText = "text-orange-900";
    backgroundClass = "bg-orange-200";
  } else if (color === "blue") {
    colorClass = "bg-blue-500";
    colorBottom = "border-blue-700";
    colorText = "text-blue-900";
    backgroundClass = "bg-blue-200";
  } else if (color === "yellow") {
    colorClass = "bg-yellow-400";
    colorBottom = "border-yellow-600";
    colorText = "text-yellow-900";
    backgroundClass = "bg-yellow-200";
  } else {
    colorClass = "bg-white";
    colorBottom = "border-black";
    colorText = "text-black";
    backgroundClass = "bg-gray-200";
  }

  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="relative inline-block">
      <div className="btn-primary-scheme"></div>
      <button
        onClick={handleClick}
        className={`relative ${colorClass} ${colorText} px-3 py-1 rounded-lg border-2 border-black ${colorBottom}`}
      >
        <span className="relative z-10 font-bold">{text}</span>
      </button>
    </div>
  );
};

export default BtnPrimary;
