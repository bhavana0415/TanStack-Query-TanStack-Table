import Image from "next/image";

export default function Loader({ isLoading, message }) {
  if (!isLoading) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        zIndex: 9999,
        backgroundColor: "#092635",
      }}
      className="flex flex-col justify-center items-center"
    >
      <Image
        className="w-20 h-20 animate-spin shadow-lg"
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="Loading icon"
        width={300}
        height={300}
      />
      {message && <p className="text-white mt-4">{message}</p>}
    </div>
  );
}
