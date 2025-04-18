import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResultCard = ({ title, value, icon, status }) => {
  // Define color schemes for different statuses
  const statusColors = {
    Normal: "text-green-700 bg-green-100",
    High: "text-red-700 bg-red-100",
    Low: "text-blue-700 bg-blue-100",
    Good: "text-orange-700 bg-orange-100",
    Warning: "text-yellow-700 bg-yellow-100"
  };

  // Split value into number and unit
  const [mainValue, unit] = value.split(' ');

  return (
    <Card className="p-3 m-0 rounded-lg shadow-md sm:p-4 sm:m-4">
      <CardHeader className="p-0 m-0">
        <CardTitle className="text-[13px] font-semibold sm:text-sm m-0 p-0">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-0 m-0">
        <div className="flex items-center space-x-2">
          <p className="text-[20px] font-bold">
            {mainValue} <span className="text-[14px] font-medium">{unit}</span>
          </p>
        </div>
        {icon && (
          <div className="mt-1.5 mr-2">
            <img
              src={icon}
              alt={title}
              className="object-contain w-[30px] h-[30px]"
            />
          </div>
        )}
      </CardContent>
      {status && (
        <CardContent className="p-0 m-0 mt-1">
          <p
            className={`text-[10px] font-medium text-center rounded-lg px-2 py-0.5 ${statusColors[status]}`}
            style={{ maxWidth: "60px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {status}
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default ResultCard;

