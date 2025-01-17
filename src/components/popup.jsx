const Popup = ({ title, message, buttonText, onReset, imageSrc }) => (
  <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 animatey">
    <div className="bg-white p-6 rounded-md shadow-md text-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Popup Image"
          className="w-16 h-16 mx-auto mb-4"
        />
      )}
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{message}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={onReset}
      >
        {buttonText}
      </button>
    </div>
  </div>
)

export default Popup
