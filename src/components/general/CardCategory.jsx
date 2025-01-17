export default function CardCategory({ name, colorClass }) {
  return (
    <div className="p-2 lg:w-1/6 md:w-1/3 w-full">
      <div className="flex space-x-4">
        <button
          className={`${colorClass} text-white rounded px-4 py-2 hover:${
            colorClass.split("-")[0]
          }-600`}
        >
          {name}
        </button>
      </div>
    </div>
  );
}
